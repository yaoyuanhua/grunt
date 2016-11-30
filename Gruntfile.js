module.exports = function(grunt) {
	
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // 压缩JS
    uglify: {  // uglify插件的配置信息
    	options: {
              banner: '/*!  <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
              //footer: '/*!  <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
              //report: "min"  //输出压缩率，可选的值有 false(不输出信息)，gzip
              //beautify: true  //美化代码
        },
        buildall: {//按原文件结构压缩js文件夹内所有JS文件
            files: [{
                expand:true,  //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
                cwd:'js',//js目录下
                src:'*.js',//所有js文件
                dest: 'destMin/js',//输出到此目录下
                //ext: '.min.js' //.min.js扩展
            }]
        },
    },
    // 压缩CSS
    cssmin: {
      //文件头部输出信息
      	options: {
        banner: '/*!  <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
        //美化代码
        //beautify: {
          //中文ascii化，非常有用！防止中文乱码的神配置
        //  ascii_only: true
        //}
      	},
      	my_target: {
        files: [{
            expand:true,
            cwd:'css',//css目录下
            src:'*.css',//所有css文件
            dest: 'destMin/css',//输出到此目录下
            //ext: '.min.css' //.min.js扩展
        }]
      }
    },
    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,  //png图片优化水平，3是默认值，取值区间0-7
          pngquant: true
        },
        files: [
          {expand: true, 
          cwd: 'img',   //img目录
          src: ['*.{png,jpg,jpeg,gif,webp,svg}'],  // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'dest/img'}  //输出到此目录下
        ]
      }
    },
    //压缩HTML
    htmlmin: {
		options: {
			removeComments: true,  //删除HTML注释
			removeCommentsFromCDATA: true,  //删除<script>和<style>标签内的HTML注释
			collapseWhitespace: true,   //删除文档树中文本节点的空白。不会影响重大的空白，比如在SCRIPT,STYLE,PRE或TEXTAREA等元素内容。
			//collapseBooleanAttributes: true,  //删除布尔属性
			//removeAttributeQuotes: true,   //删除属性的引号，当安全的情况下
			//removeRedundantAttributes: true,  //删除多余的属性，像type="text/javascript"。
			//useShortDoctype: true,   //用短的HTML5的<!DOCTYPE html>代替doctype
			removeEmptyAttributes: true,  //删除空（或空白）属性
			//removeOptionalTags: true  //一些元素允许省略标签，像</td>
			//removeEmptyElements    //删除空元素
		},
		html: {
			files: [
				{expand: true, src: ['destHash/*.html'], dest: 'dest/'}
			]
		}
	},
      // 复制文件
      copy: {
          one: {
              files: [
                   {expand: true, cwd: 'js/lib/', src: '*', dest: 'dest/js/lib'},
                   {expand: true, cwd: 'js/dist/', src: '*', dest: 'dest/js/dist'},
                   {expand: true, cwd: 'js/audiojs/', src: '*', dest: 'dest/js/audiojs'},
                   {expand: true, cwd: 'css/includes/', src: '*', dest: 'dest/css/includes'},
                   {expand: true, cwd: 'font/', src: '*', dest: 'dest/font'},
                   {expand: true,  src: 'favicon.ico', dest: 'dest/'},
                   {expand: true, src: '*.html', dest: 'destHash/'}
              ]
          },
          tow: {
              files: [
                  {expand: true, cwd: 'destHash/js/', src: '*', dest: 'dest/js/'},
                  {expand: true, cwd: 'destHash/css/', src: '*', dest: 'dest/css/'},
                  {expand: true, cwd: 'dest/destHash/', src: '*.html', dest: 'dest/'},
              ]
          }
      },
      //删除文件
      clean: {
          /*build: {
              src: ["destMin",'destHash','dest/destHash']
          }*/
         one: {
              files: [
                   {src: ["dest"]},
              ]
          },
          tow: {
              files: [
                  {src: ["destMin",'destHash','dest/destHash']},
              ]
          }
      },
	  
      // 静态文件hash
      filerev: {
          css: {
              src: 'destMin/css/*.css',
              dest: 'destHash/css/'
          },
          js: {
              src: 'destMin/js/*.js',
              dest: 'destHash/js/'
          },
      },
	  //更换静态文件名
      usemin: {
          html: ['destHash/*.html']
      },
    //合并
//  concat:{
//  	options: {
//            //banner: '/*!  <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
//            //footer: '/*!  <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
//            //report: "min",  //输出压缩率，可选的值有 false(不输出信息)，gzip
//            //beautify: true  //美化代码
//   },
//  	bar:{
//  		src:['build/*.js'],
//  		dest:'dest/all.min.js',
//  	}
//  },
//  watch:{
//  	files:['js/*.js'],
//  	tasks:['uglify','concat']
//  }
  });
  
  // Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

  // 加载任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
	//
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
	
	//grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认被执行的任务列表。

    //grunt.registerTask('default', ['uglify','cssmin','copy:one','imagemin','filerev','usemin','htmlmin','copy:tow','clean']);

	//grunt.registerTask('a', ['uglify','cssmin','copy:one','imagemin']);

    //grunt.registerTask('b', ['filerev']);

   //grunt.registerTask('c', ['usemin']);

    //grunt.registerTask('d', ['htmlmin']);

    //grunt.registerTask('e', ['copy:tow']);

    //grunt.registerTask('f', ['clean']);

	grunt.registerTask('desta', ['clean:one','uglify','cssmin','copy:one','imagemin','filerev']);
	
	grunt.registerTask('destb', ['usemin','htmlmin','copy:tow','clean:tow']);

};