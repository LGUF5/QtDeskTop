// JavaScript Document
$.fn.extend({
	loadMyApp:function(){
		var sjson = Qt.readFromFile("html/files/my.txt");
		if( sjson == null || sjson.length < 5 )
		{
			var html = '<li class="app" id="add"><a class="appback" href="#"><img src="img/add.png" /><span>���Ӧ��</span></a></li>';
			$("#ulist").html(html);
			$("li#add").readyAdd();
			return;
		}
		var obj = JSON.parse(sjson);
		for ( key in obj )
		{
			var title = key;
			var img = obj[key].img;
			var path = obj[key].file;
			$('#ulist').addApp(img,title,path);	
			var value = new Object;
			value.img = img;
			value.file = path;
			myApps[key] = value;
		}
	},
	enableStart:function(){
	$('.download').click(function(e) {
		var path = $(this).attr('href');
		alert(path);
		Qt.open(path);
		});
	},
	//������Ĵ�ʹ��
	enableDownload:function(){

	$('.download').click(function(e) {
    	var obj = new Object;
		obj.img = $(this).parent().parent().find('img').attr('src');
		obj.title = $(this).parent().find('li.txt').html();
		obj.file = $(this).attr('href');
		Qt.setSoftInfo(JSON.stringify(obj));
		var title = $(this).attr('title');
		if ( apps_installed[title] == 'yes')
		{
			Qt.msgBox('��ʾ','������Ѿ���װ');
			return;
		}
		//Qt.download(obj.file);
		fname = "html/files/" + obj.title+".exe";
		alert(fname);
		$(this).html('�������ذ�װ');
		Qt.download(obj.file,fname);
		apps_installed[title] = 'yes';
		Qt.saveData('html/files/installed.json',JSON.stringify(apps_installed));
		});
	},
	enableUpdate:function(){

	$('a.toupdate').click(function(e) {
    	var obj = new Object;
		obj.img = $(this).parent().parent().find('img').attr('src');
		obj.title = $(this).parent().find('li.txt').html();
		obj.file = $(this).attr('href');
		Qt.setSoftInfo(JSON.stringify(obj));
		var title = $(this).attr('title');
		if ( apps_installed[title] == 'yes')
		{
			Qt.msgBox('��ʾ','������Ѿ���װ');
			return;
		}
		//Qt.download(obj.file);
		fname = "html/files/" + obj.title+".exe";
		alert(fname);
		$(this).html('��������');
		Qt.download(obj.file,fname);
		apps_installed[title] = 'yes';
		Qt.saveData('html/files/installed.json',JSON.stringify(apps_installed));
		});
	},	
	//������ʹ��
	addApp:function(src,title,path)
	{
		$('#add').remove();
		var html = $(this).html();
		var obj = new Object;
		obj.img = src;
		obj.file = path;
		myApps[title] = obj;
		html += '<li class="app"><a class="appback" href="'+path+'"><img src="' + src + '" /><span>'+title +'</span></a></li>';
		html += '<li class="app" id="add"><a class="appback" href="#"><img src="img/add.png" /><span>���Ӧ��</span></a></li>';
		$(this).html(html);
		$("li#add").readyAdd();
		$('.appback').click(function(e) {
            var path = $(this).attr('href');
			if ( path == '#'){
				return;	
			}else{
				Qt.exec(path);	
			}
        });

	},

	readyAdd:function(){
				
		$("li#add").click(function(e) {
		Qt.setSoftInfo('');
    	Qt.showWindow('softcenter');
		var softinfo = Qt.getSoftInfo();
		var obj = JSON.parse(softinfo);
		if ( softinfo == '')
		{
			return;
		}else
		{
			if ( obj.title in myApps )
			{
				Qt.msgBox('��ʾ','������Ѿ����');
				return;	
			}
			$('#ulist').addApp(obj.img,obj.title,obj.file);	
			var apps = JSON.stringify(myApps);
			Qt.saveData('html/files/my.txt',apps);
		}
	 })
	},
	setChecked:function(cls,pic){
		var img = $(cls).find('img');
		img.css('display','none');
		img.removeClass('checkimg');
		img = $(this).find('img');
		img.attr('src',pic);
		img.css('display','block');
		img.addClass('checkimg');
	}	
});