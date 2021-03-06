/* Copyright Tutorials Point (India) Private Limited */
/* Its purely illegal to reproduce or use this code in any of the applications outside Tutorials Point (India) Private Limited */
/**/
var contentcover;
var contentframe;
var emailid = "";
var token = "";
var th = ($(window).height()) * 0.99;
var tw = ($(window).width() ) * 0.6;
var captcha = "";
var codeeditor;
var editor_theme = "cobalt";
var editor_font_size = 14;
var editor_invisible = false;
var editor_gutter = true;
var editor_tab_size = 4;
var editor_type = "null";
var editor_soft_wrap = "true";
var terminal_mode = 'V';
var $win = null;
// Set Authentication code before you proceed further.
$("#searchproject").css({ "display": "none" });
$.ajax({
    type: "GET",
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    url: SERVER + "/set_auth_code.php",
    dataType: 'json',
    success: function(data) {
        if( userid > 0){
             $("#login").css({ "display": "none" });
             $("#logout").css({ "display": "block" });
             $("#searchproject").css({ "display": "block" });
             $("#logout .l-btn-text").html(username);
        }
    }
});
$(document).ready(function() {
    var link = $('head').find('link:first');
    window.onbeforeunload = function(){
      return "Leaving this page may cause loss of your code!";
    };
    window.beforeunload = function(){
      return "Leaving this page may cause loss of your code!";
    };
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 'd':
                    event.preventDefault();
                    alert('ctrl-D');
                    break;
                case 's':
                    event.preventDefault();
                    saveProject();
                    break;
                case 'f':
                    event.preventDefault();
                    alert('ctrl-f');
                    break;
                case 'g':
                    event.preventDefault();
                    alert('ctrl-g');
                    break;
            }
        }
    });
    $(window).load(function() {
        $("#home").css({
            "visibility": "hidden"
        });
        // Set bottom section as per screen height and ads height.
        var eh = $('#east').height();
        var sh = $('#south').height();
        var fh = 345;
        if (eh + sh + 50 - 520 < fh) {
            fh = eh + sh + 50 - 520;
        }
/*
        $("#cc").layout('panel','east').panel('resize', {width:'40%'});
        $("#cc").layout('panel','south').panel('resize', {height:1});
*/
        $("#cc").layout('resize');
        addNewTab(filename, false, modename);
        if( !preview ){
           addStdinTab();
        }
        $('#codebox').tabs('select', 0);
        $("#web_view").css( "display", "inline-block");
        $("#web_view_space").css( "display", "inline-block");
        $("#execute").css( "display", "inline-block");
        $("#execute_space").css( "display", "inline-block");
        if( preview ){
            $("#compileoptions").css( "display", "none");
            $("#compileoptions_space").css( "display", "none");
            $("#execute").css( "display", "none");
            $("#execute_space").css( "display", "none");
        }else{
            $("#handle").css( "display", "none");
            $("#web_view").css( "display", "none");
            $("#web_view_space").css( "display", "none");
        }
        $("#cc").layout('resize');
        $("h1.main-title").text( projecttitle + " (" + version + ")");
        if (getCookie("editor_theme")) {
            editor_theme = getCookie("editor_theme");
        }

        if (getCookie("editor_type")) {
            editor_type = getCookie("editor_type");
        }

        if (getCookie("editor_font_size")) {
            editor_font_size = parseInt(getCookie("editor_font_size"));
        //    setEditorFontSize(editor_font_size);
        }
        if (getCookie("editor_soft_wrap")) {
            editor_soft_wrap = getCookie("editor_soft_wrap");
        }
        if (getCookie("editor_tab_size")) {
            editor_tab_size = parseInt(getCookie("editor_tab_size"));
        }

        if (getCookie("editor_invisible") && getCookie("editor_invisible") != 'false') {
            editor_invisible = getCookie("editor_invisible");
        }
        if (getCookie("editor_gutter") && getCookie("editor_gutter") != 'false') {
            editor_gutter = getCookie("editor_gutter");
        }
        setTerminalMode("V");
        $("#cc").css({
            opacity: 1.0,
            visibility: "visible"
        });
        $("#handle").click( function(){
            $(this).hide("slow");
            showDevices();
        });
        $("#east").click( function(){
            if( preview ){
               $("#devices").hide("slow");
               $("#handle").show("slow");
            }
        });
        $("#center").click( function(){
            if( preview ){
               $("#devices").hide("slow");
               $("#handle").show("slow");
            }
        });
        $("#west").click( function(){
            if( preview ){
               $("#devices").hide("slow");
               $("#handle").show("slow");
            }
        });
        $("#north").click( function(){
            if( preview ){
               $("#devices").hide("slow");
               $("#handle").show("slow");
            }
        });
        $("#south").click( function(){
            if( preview ){
               $("#devices").hide("slow");
               $("#handle").show("slow");
            }
        });
        $("#loading").css({
            "visibility": "hidden"
        });
        var device_type = "web_view";
        if( langid === "jquerymobile" ){
            device_type = "portrait_phone_view";
        }
        $("#web_view").click(function() {
             fetchContent( device_type);
        });
        $("#desktop_preview").click(function() {
             device_type = "web_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "desktop");
             contentframe.attr("class", "");
             contentframe.attr("class", "fdesktop");
             fetchContent( device_type);
        });
        $("#portrait_phone_preview").click(function() {
             device_type = "portrait_phone_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "phone_portrait");
             contentframe.attr("class", "");
             contentframe.attr("class", "fphone_portrait");
             fetchContent( device_type);
        });
        $("#landscape_phone_preview").click(function() {
             device_type = "landscape_phone_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "phone_landscape");
             contentframe.attr("class", "");
             contentframe.attr("class", "fphone_landscape");
             fetchContent( device_type);
        });
        $("#portrait_pad_preview").click(function() {
             if( terminal_mode === "H" ){
                 setMaximize('H');
             }else{
                 setMaximize('V');
             }
             device_type = "portrait_pad_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "pad_portrait");
             contentframe.attr("class", "");
             contentframe.attr("class", "fpad_portrait");
             fetchContent( device_type);
        });
        $("#landscape_pad_preview").click(function() {
             if( terminal_mode === "H" ){
                 setMaximize('H');
             }else{
                 setMaximize('V');
             }
             device_type = "landscape_pad_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "pad_landscape");
             contentframe.attr("class", "");
             contentframe.attr("class", "fpad_landscape");
             fetchContent( device_type);
        });
        $("#execute").click(function() {
             device_type = "system_view";
             contentcover.attr("class", "");
             contentcover.attr("class", "desktop");
             contentframe.attr("class", "");
             contentframe.attr("class", "fdesktop");
             fetchContent();
        });
    });
    $(window).mousemove(function( event ) {
         if( codeeditor ){
             codeeditor.resize( true );
         }
    });
    $('#minimize').click(function() {
       $("#cc").layout('collapse', 'south');
       $("#cc").layout('resize');
       $("#devices").height( $('#east').height());
    });
    $('#maximize').click(function() {
       var wh = $('#cc').height();
       var th = $('#north').height();
       $("#cc").layout('panel', 'south').panel('resize', {
                height:wh-th 
       });
       $("#cc").layout('expand', 'south');
       $("#cc").layout('resize');
    });
    $('#mediumize').click(function() {
       $("#cc").layout('panel', 'south').panel('resize', {
                height:320
       });
       $("#cc").layout('expand', 'south');
       $("#cc").layout('resize');
    });
    $("#cc").layout({
         onExpand: function(region) {
            $("#cc").layout('resize');
         },
         onCollapse: function(region) {
            $("#cc").layout('resize');
            $("#devices").height( $('#center').height() - 29);
         },
    });
    $("#cc").layout('panel', 'west').panel({
        onExpand: function() {
            reloadTree();
        }
    });
    // Latex Editor keyboard functionality.
    $('.keyboard li').click(function() {
        var $this = $(this);
        var html = $(this).html();
        var latex;
        var el = html.match(/(.*)MathJax-Element-(\d+)(.*)/);
        if (el) {
            var id = el[2];
            latex = $('#MathJax-Element-' + id).html();
        } else if (html.match(/Space/)) {
            latex = '\\:';
        } else if (html.match(/Quad/)) {
            latex = '\\quad';
        } else if (html.match(/Enter/)) {
            latex = '\\\\';
        }
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        var position = codeeditor.getCursorPosition();
        codeeditor.getSession().insert(position, latex);
    });
    // Edit functionlaity starts here
    $('#undo').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        if (codeeditor.getSession().getUndoManager().hasUndo()) {
            codeeditor.getSession().getUndoManager().undo(false);
        }
    });
    $('#redo').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        if (codeeditor.getSession().getUndoManager().hasRedo()) {
            codeeditor.getSession().getUndoManager().redo(false);
        }
    });
    var clipboard;
    $('#cut').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        var selectedRange = codeeditor.getSelectionRange();
        if (codeeditor.getSession().getTextRange(selectedRange)) {
            clipboard = codeeditor.getSession().getTextRange(selectedRange);
            codeeditor.getSession().remove(selectedRange);
        }
    });
    $('#delete').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        var selectedRange = codeeditor.getSelectionRange();
        if (codeeditor.getSession().getTextRange(selectedRange)) {
            codeeditor.getSession().remove(selectedRange);
        }
    });
    $('#copy').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        var selectedRange = codeeditor.getSelectionRange();
        if (codeeditor.getSession().getTextRange(selectedRange)) {
            clipboard = codeeditor.getSession().getTextRange(selectedRange);
        }
    });
    $('#paste').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        var position = codeeditor.getCursorPosition();
        codeeditor.getSession().insert(position, clipboard);
    });
    $('#select').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        codeeditor.getSelection().selectAll();
    });
    $('#find').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        codeeditor.execCommand("find");
    });
    $('#findreplace').click(function() {
        // Get active tab.
        var tab = $('#codebox').tabs('getSelected');
        var tabid = tab.panel('options').id;
        codeeditor.execCommand("replace");
    });
});
// Global Functions
function showDevices(){
    if( terminal_mode === "H" ){
        $("#devices").height( $('#east').height() - 29);
    }else{
        $("#devices").height( $('#east').height());
    }
    if( terminal_mode === "H" && $('#east').height() < 20){
        $("#devices").height("100%");
    }
    $("#devices").hide("slow");
    $("#devices").show("slow");
}
function fetchContent( device ){
    if( preview ){
          $("#devices").hide("slow");
          $("#handle").show("slow");
    }
    contentcover =  $("#eastcover");
    contentframe =  $("#eastframe");
    var stage =  $("#east");
    if( terminal_mode === "H" ){
        if ($("#cc").layout('panel', 'south').panel('options').collapsed) {
            $("#cc").layout('expand', 'south');
        }
        contentcover =  $("#southcover");
        contentframe =  $("#southframe");
        stage =  $("#south");
    }else{
        if ($("#cc").layout('panel', 'east').panel('options').collapsed) {
            $("#cc").layout('expand', 'east');
        }
    }
    if( preview ){
        saveFiles(function(status) {
           var url = SERVER + "/web_view.php?langid="+langid+"&device="+device;
           stage.panel({
               href: url,
               extractor: function(data) {
                   return data;
               },
               onLoadError:function( error ){
                   $.messager.alert('Error', error, 'info');
                   return true;
               }
            });
        });
    }else{
        saveFiles(function(status) {/* Save file in the background */ });
        var content = codeeditor.getValue();
        var stdinput = "";
        if( langid != "latex" && langid != "tex" && langid != "jsp" && langid != "coldfusion" && langid != "phpweb"){
           stdinput = $("#stdinput").textbox('getValue');
        }
        var url = "https://tpcg.tutorialspoint.com/tpcg.php";
        $("[name='lang']").val(langid);
        $("[name='code']").val(content);
        $("[name='ext']").val(ext);
        $("[name='mainfile']").val(mainfile);
        $("[name='compile']").val(compile);
        $("[name='execute']").val(execute);
        $("[name='stdinput']").val(stdinput);
        $.ajax({
           type: "POST",
           cache: false,
           crossDomain: true,
           url: url,
           target: "view",
           data: $("#ff").serialize(),
           beforeSend: function() {
               $("#loading").css({ "visibility": "visible" });
           },
           success:function(data) {
               if( langid === "jsp" || langid === "coldfusion" || langid === "phpweb" ){
                   contentframe.contents().find('body').html( data );
               }else{
                   contentcover.html('<div style="padding-left:10px;"><pre style="margin:5px;">' + data + '</pre></div>');
               }
               $("#loading").css({ "visibility": "hidden" });
               return false;
           },
           error:function (data, status, error) {
              alert(data);
              alert(error);
              return false;
           }
       });
    }
}
function setMaximize( mode ) {
    var wih = $('#cc').height();
    var sh = $('#south').height();
    var wiw = $('#cc').width();
    var ew = $('#east').width();
    var nh = $('#north').height();
    var ww = $('#west').width();
    var h40 = wih*40/100;
    var w50 = wiw*50/100;
    if( mode === "H" ){
        if( sh <= (wih*40)/100 ){
           $("#cc").layout('panel', 'south').panel('resize', {
                height:wih-nh
           });
           $("#cc").layout('resize');
        }else{
           $("#cc").layout('panel', 'south').panel('resize', {
                height:h40
           });
           $("#cc").layout('resize');
        }
    }else{
        if( ew <= (wiw*50)/100 ){
           $("#cc").layout('panel', 'east').panel('resize', {
                width:wiw-ww
           });
           $("#cc").layout('resize');
        }else{
           $("#cc").layout('panel', 'east').panel('resize', {
                width:w50
           });
           $("#cc").layout('resize');
        }
   }
}
function setMinimize( mode ){
    if( mode === "H" ){
       $("#cc").layout('collapse', 'south');
    }else{
       $("#cc").layout('collapse', 'east');
    }
    $("#cc").layout('resize');
}
function whySignup(){
    $win = $('#sign').window({
    title: ' Why Signup?',
    iconCls: 'icon-signup',
          width: '500',
          height: '260',
         content: "<br><h2>You need to signup if you are willing to: </h2><ul><li style='font-size: 15px; line-height: 26px;'>Save your projects for later use</li><li style='font-size: 15px; line-height: 26px;'>Manage your permalinks</li></ul>"
    });
    $win.window('open');
    $('#sign').window('center');
}
function generateLink() {
           var content = codeeditor.getValue();
           var title = $("#project_title").textbox("getValue");
            // Make Ajax call to save file
            if( title.length < 4 ){
                $("#warning").text("Please enter a suitable title (Minimum 4 characters)");
                setTimeout(function() {
                    $("#warning").text("");
                }, 4000);
               return false;
            }
            var url = SERVER + "/generate_link.php";
            var inputs = {
                "langid": langid,
                "title" : title,
                "content": content
            };
            $.ajax({
                url: url,
                crossDomain: true,
                xhrFields: {
                   withCredentials: true
                },
                type: "POST",
                data: inputs,
                dataType:'json',
                beforeSend: function() {
                    $("#loading").css( {"top":"12%", "left":"47%"});
                    $("#loading").css({
                        "visibility": "visible"
                    });
                },
                error:function (data, status, error) {
                   $.messager.alert('Error', error, 'info');
                   $("#loading").css({
                        "visibility": "hidden"
                   });
                   return false;
                },
                success: function(data) {
                    if( terminal_mode === "H" ){   
                        $("#loading").css( {"top":"75%", "left":"50%"});
                    }else{
                        $("#loading").css( {"top":"50%", "left":"75%"});
                    }

                    $("#loading").css({
                        "visibility": "hidden"
                    });
                    if (data.status) {
                       $("#warning").text(data.message);
                       setTimeout(function() {
                          $("#warning").text("");
                       }, 4000);
                      return false;
                    }
                    $("h1.main-title").text( title + " (" + version + ")");
                    $("#login #container").html(data.content);
                }
            });
}
function openHelp() {
    $win = $('#sign').window({
        title: 'Coding Ground Help',
        iconCls: 'icon-help',
        width: '825',
        height: '560'
    });
    $win.window('open');
    $('#sign').window('refresh', "https://www.tutorialspoint.com/codingground/help.htm");
    $('#sign').window('center');
}
function openLogin() {
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    addNewTab("Login", false, false);
}
function openGenerateLink() {
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    addNewTab("Permalink", false, false);
}
function openForgotPassword() {
   if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
   }else{
       $("#cc").layout('collapse', 'south');
   }
   var inputs = { 'hello': 'bye' };
   $.ajax({
       type: "GET",
       data: inputs,
       crossDomain: true,
       xhrFields: {
          withCredentials: true
       },
       url: SERVER + "/get_captcha.php",
       dataType: 'json',
       beforeSend: function() {                                                                                                                                                                                                                         
          $("#loading").css({ "visibility": "visible" });                                                                                                                                                                                              
       },
       success: function(data) {
           if( data.captcha.length > 10 ){
              captcha = data.captcha;
              var tab = $('#codebox').tabs('getSelected');
              $('#codebox').tabs('update', {
                  tab:tab,
                  options: {
                     title: 'Forgot Password',
                     href: SERVER + "/" + 'forgot-password.htm',
        	   }
              });
              tab.panel('refresh', SERVER + "/" + 'forgot-password.htm');
           }
           $("#loading").css({ "visibility": "hidden" });
       }
    });
}
function getProjects(keyword){
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    if( userid > 0){
         var tab =  $('#codebox').tabs('getTab', "Login" ) || $('#codebox').tabs('getTab', "Profile" ) || $('#codebox').tabs('getTab', "Permalink" ) || $('#codebox').tabs('getTab', "Change Password" ) || $('#codebox').tabs('getTab', "Projects" );
         if( !tab ){
             tab = $('#codebox').tabs('add', {
                 title: "Login",
                 id: "Login",
                 closable: true,
             });
             tab =  $('#codebox').tabs('getTab', "Login" );
         }
         var index = $("#codebox").tabs('getTabIndex',tab);
         $('#codebox').tabs('select', index);
         $('#codebox').tabs('update', {
             tab:tab,
             options: {
                 title: 'Projects',
                 href: SERVER + "/get_projects.php?keyword=" + keyword,
             }
         });
         tab.panel('refresh', SERVER + "/get_projects.php?keyword=" + keyword);
   }else{
      openLogin();
   }
}
function userProfile(){
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    if( userid > 0){
       saveFiles(function(status) {
          var tab =  $('#codebox').tabs('getTab', "Login" ) || $('#codebox').tabs('getTab', "Profile" ) || $('#codebox').tabs('getTab', "Permalink" ) || $('#codebox').tabs('getTab', "Change Password" ) || $('#codebox').tabs('getTab', "Projects" );
          if( !tab ){
             tab = $('#codebox').tabs('add', {
                 title: "Login",
                 id: "Login",
                 closable: true,
             });
             tab =  $('#codebox').tabs('getTab', "Login" );
          }
          var index = $("#codebox").tabs('getTabIndex',tab);
          $('#codebox').tabs('select', index);
          $('#codebox').tabs('update', {
             tab:tab,
             options: {
                 title: 'Profile',
                 href: SERVER + "/user_profile.php"
             }
         });
         tab.panel('refresh', SERVER + "/user_profile.php");
       });
   }else{
      openLogin();
   }
}
function openChangePassword(){
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    if( userid > 0){
       saveFiles(function(status) {
          var tab =  $('#codebox').tabs('getTab', "Login" ) || $('#codebox').tabs('getTab', "Profile" ) || $('#codebox').tabs('getTab', "Permalink" ) || $('#codebox').tabs('getTab', "Change Password" ) || $('#codebox').tabs('getTab', "Projects" );
          if( !tab ){
             tab = $('#codebox').tabs('add', {
                 title: "Login",
                 id: "Login",
                 closable: true,
             });
             tab =  $('#codebox').tabs('getTab', "Login" );
          }
          var index = $("#codebox").tabs('getTabIndex',tab);
          $('#codebox').tabs('select', index);
          $('#codebox').tabs('update', {
             tab:tab,
             options: {
                 title: 'Change Password',
                 href: SERVER + "/change-my-password.htm",
             }
         });
         tab.panel('refresh', SERVER + "/change-my-password.htm");
       });
   }else{
      openLogin();
   }
}
function openSignup() {
   if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
   }else{
       $("#cc").layout('collapse', 'south');
   }
   var inputs = { 'hello': 'bye' };
   $.ajax({
       type: "GET",
       data: inputs,
       crossDomain: true,
       xhrFields: {
          withCredentials: true
       },
       url: SERVER + "/get_captcha.php",
       dataType: 'json',
       beforeSend: function() {                                                                                                                                                                                                                         
           $("#loading").css({ "visibility": "visible" });                                                                                                                                                                                              
       },
       success: function(data) {
           if( data.captcha.length > 10 ){
              captcha = data.captcha;
              var tab = $('#codebox').tabs('getSelected');
              $('#codebox').tabs('update', {
                  tab:tab,
                  options: {
                     title: 'Sign Up',
                     href: SERVER + "/" + 'signup.htm',
                   }
              });
              tab.panel('refresh', SERVER + "/" + 'signup.htm');
           }
           $("#loading").css({ "visibility": "hidden" });
       }
    });
}
function validateEmail(email){ 
     var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
     return re.test(email); 
}
function userLogout(){
    if( terminal_mode == 'V' ){
       $("#cc").layout('collapse', 'east');
    }else{
       $("#cc").layout('collapse', 'south');
    }
    var url = SERVER + "/user_logout.php";
    var inputs = {
        "emailid":emailid, "token":token
    };
    $.ajax({
        type: "GET",
        url: url,
        data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        dataType: 'json',
        beforeSend: function() {
           $("#loading").css({ "visibility": "visible" });
        },
        success: function(data) {
            if( !data.status ){
               emailid = null;
               userid = 0;
               $("#logout").css({ "display": "none" });
               $("#searchproject").css({ "display": "none" });
               $("#login").css({ "display": "block" });
               $('#codebox').tabs('close', "Projects");
               addNewTab("Login", false, false);
            }else{
                $("#warning").text( data.message ); 
            }
            $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function userLogin() {
   emailid = $("#emailid").textbox("getValue");
    if( !validateEmail( emailid) ){
        $("#warning").text("Enter a valid email address");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password = $("#password").textbox("getValue");
    if( password.length < 6 ){
        $("#warning").text("Enter atleast 6 characters for your password");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var url = SERVER + "/user_login.php";
    var inputs = {
        "emailid":emailid, "password":password
    };
    $.ajax({
        type: "POST",
        url: url,
        data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        dataType: 'json',
        beforeSend: function() {
           $("#loading").css({ "visibility": "visible" });
        },
        success: function(data){
            if( !data.status ){
               userid = data.userid;
               username = data.username;
               $("#login").css({ "display": "none" });
               $("#logout").css({ "display": "block" });
               $("#searchproject").css({ "display": "block" });
               $("#logout .l-btn-text").html(username);
               getProjects();
            }else{
               $("#warning").text(data.message);
            }
            setTimeout(function() {
               $("#warning").text("");
            }, 5000);
            $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function sendPasswordCode() {
   var emailid = $("#emailid").textbox("getValue");
    if( !validateEmail( emailid) ){
        $("#warning").text("Enter a valid email address");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var captcha = $("#captcha_value").textbox("getValue");
    if( captcha.length < 6 ){
        $("#warning").text("Please enter given number from the image");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var url = SERVER + "/send_code.php";
    var inputs = {
        "emailid":emailid, "captcha":captcha
    };
    $.ajax({
        type: "POST",
        url: url,
        data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        dataType: 'json',
        beforeSend: function() {
           $("#loading").css({ "visibility": "visible" });
        },
        success: function(data) {
            $("#warning").text(data.message);
            setTimeout(function() {
               $("#warning").text("");
            }, 5000);
            $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function openCompileOptions() {
    $win = $('#sign').window({
        title: 'Compilation Options',
        iconCls: 'icon-execute-project',
        width: '580',
        height: '350'
    });
    $win.window('open');
    $('#sign').window('refresh', SERVER + "/compile_options.php");
}
function openSearchProject() {
    $win = $('#sign').window({
        title: 'Search Project',
        iconCls: 'icon-search',
        width: '580',
        height: '350'
    });
    $win.window('open');
    $('#sign').window('refresh', SERVER + "/search_project.php");
}
function openEmbedLink( linkid ) {
    $win = $('#sign').window({
        title: 'Embed Link',
        iconCls: 'icon-embed',
        width: '750',
        height: '450'
    });
    $win.window('open');
    $('#sign').window('refresh', SERVER + "/show_permalink.php?permalink="+linkid);
}
function usePasswordCode() {
   var inputs = { 'hello': 'bye' };
   $.ajax({
       type: "GET",
       data: inputs,
       crossDomain: true,
       xhrFields: {
          withCredentials: true
       },
       url: SERVER + "/get_captcha.php",
       dataType: 'json',
       success: function(data) {
           if( data.captcha.length > 10 ){
              captcha = data.captcha;
              var tab = $('#codebox').tabs('getSelected');
              $('#codebox').tabs('update', {
                  tab:tab,
                  options: {
                     title: 'Change Password',
                     href: SERVER + "/" + 'change-password.htm',
                   }
              });
              tab.panel('refresh', SERVER + "/" + 'change-password.htm');
           }
       }
    });
}
function changeMyPassword(){
    var oldPassword = $("#oldpassword").textbox("getValue");
    if( oldPassword.length < 6 ){
        $("#warning").text("Enter atleast 6 characters for your password");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password1 = $("#password1").textbox("getValue");
    if( password1.length < 6 ){
        $("#warning").text("Enter atleast 6 characters for your password");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password2 = $("#password2").textbox("getValue");
    if( password1 != password2 ){
        $("#warning").text("Given two passwords do not match");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var url = SERVER + "/change_my_password.php";
    var inputs = { "password": oldPassword, "newpassword":password1 };
    $.ajax({
	type: "POST",
	url: url,
	data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
	dataType: 'json',
	beforeSend: function() {
	   $("#loading").css({ "visibility": "visible" });
	},
	success: function(data) {
           $("#warning").text(data.message);
           setTimeout(function() {
               $("#warning").text("");
           }, 4000);
           $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function changePassword(){
    var code = $("#code").textbox("getValue");
    if( code.length < 4 ){
        $("#warning").text("Please enter a correct secret code");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var emailid = $("#emailid").textbox("getValue");
    if( !validateEmail( emailid) ){
        $("#warning").text("Enter a valid email address");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password1 = $("#password1").textbox("getValue");
    if( password1.length < 6 ){
        $("#warning").text("Enter atleast 6 characters for your password");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password2 = $("#password2").textbox("getValue");
    if( password1 != password2 ){
        $("#warning").text("Given two passwords do not match");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var captcha = $("#captcha_value").textbox("getValue");
    if( captcha.length < 6 ){
        $("#warning").text("Please enter given number from the image");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var url = SERVER + "/change_password.php";
    var inputs = {
        "code": code, "emailid":emailid, password:password1, captcha:captcha
    };
    $.ajax({
	type: "POST",
	url: url,
	data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
	dataType: 'json',
	beforeSend: function() {
	   $("#loading").css({ "visibility": "visible" });
	},
	success: function(data) {
           $("#warning").text(data.message);
           setTimeout(function() {
               $("#warning").text("");
           }, 4000);
           $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function userSignup() {
    username = $("#username").textbox("getValue");
    if( username.length < 4 ){
        $("#warning").text("Please enter your full name");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    emailid = $("#emailid").textbox("getValue");
    if( !validateEmail( emailid) ){
        $("#warning").text("Enter a valid email address");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password1 = $("#password1").textbox("getValue");
    if( password1.length < 6 ){
        $("#warning").text("Enter atleast 6 characters for your password");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var password2 = $("#password2").textbox("getValue");
    if( password1 != password2 ){
        $("#warning").text("Given two passwords do not match");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var captcha = $("#captcha_value").textbox("getValue");
    if( captcha.length < 6 ){
        $("#warning").text("Please enter given number from the image");
        setTimeout(function() {
            $("#warning").text("");
        }, 4000);
        return false;
    }
    var url = SERVER + "/user_signup.php";
    var inputs = {
        "username": username, "emailid":emailid, password:password1, captcha:captcha
    };
    $.ajax({
	type: "POST",
	url: url,
	data: inputs,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
	dataType: 'json',
	beforeSend: function() {
	   $("#loading").css({ "visibility": "visible" });
	},
	success: function(data) {
           if( !data.status ){
               userid = data.userid;
               username = data.username;
               $("#login").css({ "display": "none" });
               $("#logout").css({ "display": "block" });
               $("#logout .l-btn-text").html(username);
               getProjects();
               $("#loading").css({ "visibility": "hidden" });
           }else{
               $("#warning").text(data.message);
           }
           setTimeout(function() {
               $("#warning").text("");
           }, 4000);
           $("#loading").css({ "visibility": "hidden" });
        }
    });
}
function saveProject() {
    if( userid <= 0){
      openLogin();
      return true;
   }
   saveFiles(function(status) {
       var inputs = {'langid': langid, "projectid" : projectid, "projecttitle" : projecttitle};
       $.ajax({
           type: "POST",
           data: inputs,
           crossDomain: true,
           xhrFields: {
               withCredentials: true
           },
           dataType: 'json',
           url: SERVER + "/save_project.php",
           beforeSend: function() {
              $("#loading").css({ "visibility": "visible" });
           },
           success: function(data) {
               if( data.status ){
                    $.messager.alert('Error', data.message, 'info');
                }
                $("#loading").css({ "visibility": "hidden" });
           }
      });
   });
}
function forkProject() {
    var inputs = {'langid': langid};
    saveFiles(function(status) {
          $.ajax({
              type: "POST",
              data: inputs,
              url: SERVER + "/fork_project.php",
              crossDomain: true,
              xhrFields: {
                 withCredentials: true
              },
              dataType: 'json',
	      beforeSend: function() {
	         $("#loading").css({ "visibility": "visible" });
              },
              success: function(data) {
                $("#loading").css({ "visibility": "hidden" });
                if( !data.status ){
                   projectid = data.projectid;
                   cancelLink();
                   $.messager.alert('Message','Project has been forked successfully','info');
                }else{
                   $.messager.alert('Error','Error in forking your project','info');
                }
              }
         });
    });
    return true;
}
function closeSign() {
    $('#sign').window('close');
    $win = null;
}

function createProject(target) {
    // Make Ajax call to  destroy sessions
    var url = SERVER + "/reset_project.php";
    var inputs = { "langid": langid };
    $.ajax({
          type: "POST",
          url: url,
          crossDomain: true,
          xhrFields: {
             withCredentials: true
          },
          data: inputs,
          dataType: 'json',
          beforeSend: function() {
             $("#loading").css({
                "visibility": "visible"
             });
          },
          success: function(data) {
             window.location = target;
             $("#loading").css({
                "visibility": "hidden"
             });
          }
    });
}
function refreshProject() {
    window.onbeforeunload = null;
    window.beforeunload = null;
    $("#loading").css({
        "visibility": "visible"
    });
    location.reload();
}
function setProjectTitle() {
    var dlg = $.messager.prompt('New project title', 'Enter new project title:', function(title) {
        if (title) {
            if (/^[a-zA-Z0-9_ ()-.+?]*$/.test(title) == false) {
                $.messager.alert('Alert Message', 'Project title should be plain text', 'info');
                return false;
            } else if (title.length > 255) {
                $.messager.alert('Alert Message', 'Project title should be less than 255 characters', 'info');
                return false;
            } else {
                projecttitle = $.trim(title);
                $("h1.main-title").text( projecttitle + " (" + version + ")");
                if( userid > 0){
                    // Make Ajax call to rename project at server
                    var url = SERVER + "/set_project_title.php";
                    var inputs = {
                        "projectid": projectid,
                        "projecttitle": projecttitle
                    };
                    $.ajax({
                        type: "POST",
                        url: url,
                        crossDomain: true,
                        xhrFields: {
                           withCredentials: true
                        },
                        data: inputs,
                        dataType: 'json',
                        beforeSend: function() {
                            $("#loading").css({
                                "visibility": "visible"
                            });
                        },
                        success: function(data) {
                            if (data.status) {
                                $.messager.alert('Error Message', data.message, 'error');
                            } else {
                                $("h1.main-title").text( projecttitle + " (" + version + ")");
                            }
                            $("#loading").css({
                                "visibility": "hidden"
                            });
                        }
                    });
                 }
            }
        }
    }).window({width:450});
    dlg.find('.messager-input').attr('value', " " + projecttitle);
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === cname) {
            return unescape(cookie[1]);
        }
    }
    return null;
}

function openWindow(url, title, width, height) {
    var leftPosition, topPosition;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //Open the window.
    window.open(url, title, "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");
}

function getTabIndex(tabid) {
    var tabindex = -1;
    var tabs = $('#codebox').tabs('tabs');
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (tab.panel('options').id === tabid) {
            tabindex = $('#codebox').tabs('getTabIndex', tab);
        }
    }
    return tabindex;
}
function addStdinTab(){
    var tabid = "stdin";
    var tabtitle = "Stdin";
    var content = $("#stdin").html();
    var claseable = false;
    if( langid === "latex" || langid === "tex" || langid === "jsp" || langid === "coldfusion" || langid === "phpweb"){
        claseable = true;
    }
    $('#codebox').tabs('add', {
        title: tabtitle,
        id: tabid,
        closable: claseable,
        content: '<input id="stdinput" data-options="prompt:\'Enter multiple values in separate lines...\'" class="easyui-textbox" multiline="true" style="width:100%; height:100%;">',
        selected: false
    });
    if( langid === "latex" || langid === "tex" || langid === "jsp" || langid === "coldfusion" || langid === "phpweb"){
       /* We do not need it in case of latex or text */
       $('#codebox').tabs('close', tabtitle);
    }
    return true;
}
function cancelLink(){
    var tabid =  "Permalink";
    var tabindex = getTabIndex(tabid);
    if ($('#codebox').tabs('exists', tabindex)) {
         $('#codebox').tabs('close', tabindex);
    }
}
function addNewTab(filename, ifNew, mode) {
    var tabid = filename;
    var tabtitle = filename;
    if( tabtitle.indexOf(".java") >= 0 ){
          tabtitle = "Source File";
    }
    var tabindex = getTabIndex(tabid);
    if ($('#codebox').tabs('exists', tabindex)) {
        if( tabid == "Login" ){
              var tab =  $('#codebox').tabs('getTab', tabindex );
              $('#codebox').tabs('update', {
                  tab:tab,
                  options: {
                     title: 'Login',
                     href: SERVER + "/" + 'login.htm',
                   }
              });
              tab.panel('refresh', SERVER + "/" + 'login.htm');
        }else if( tabid == "Permalink" ){
              var tab =  $('#codebox').tabs('getTab', tabindex );
              $('#codebox').tabs('update', {
                  tab:tab,
                  options: {
                     title: 'Permalink',
                     href: SERVER + "/" + 'generate_link_form.htm',
                   }
              });
              tab.panel('refresh', SERVER + "/" + 'generate_link_form.htm');
        }
        $('#codebox').tabs('select', tabindex);
        return true;
    }else if( tabid == "Login" ){
       $('#codebox').tabs('add', {
            title: tabtitle,
            id: tabid,
            closable: true,
            href: SERVER + "/login.htm",
            extractor: function(data) {
              return data;
            }
        });
    }else if( tabid == "Permalink" ){
       $('#codebox').tabs('add', {
            title: tabtitle,
            id: tabid,
            closable: true,
            href: SERVER + "/generate_link_form.htm",
            extractor: function(data) {
              return data;
            }
        });
    } else {
		$('#codebox').tabs('add', {
			title: tabtitle,
			id: tabid,
			closable: false,
			href: SERVER + "/load_file.php?projectid="+projectid,
			extractor: function(data) {
				return data;
			},
			onLoad: function(panel) {
				codeeditor = new ace.edit(tabid);
				codeeditor.setTheme("ace/theme/" + editor_theme);
				codeeditor.setFontSize(editor_font_size);
				codeeditor.getSession().setTabSize(editor_tab_size);
				codeeditor.getSession().setMode("ace/mode/" + mode);
				codeeditor.setShowInvisibles(editor_invisible);
				codeeditor.renderer.setShowGutter(editor_gutter);
				if (editor_type === "vim") {
					codeeditor.setKeyboardHandler(require("ace/keyboard/vim").handler);
				} else if (editor_type === "emacs") {
					codeeditor.setKeyboardHandler(require("ace/keyboard/emacs").handler);
				} else {
					codeeditor.setKeyboardHandler(null);
				}
				if (editor_soft_wrap === "true") {
					codeeditor.getSession().setUseWrapMode(true);
				} else if (editor_soft_wrap === "false") {
					codeeditor.getSession().setUseWrapMode(false);
				} else {
					codeeditor.getSession().setUseWrapMode(true);
					codeeditor.getSession().setWrapLimitRange(parseInt(editor_soft_wrap), parseInt(editor_soft_wrap));
				}
				codeeditor.getSession().on('change', function() {
					codeeditor.resize(true);
				});
				codeeditor.focus();
			}
		});
    }
    return true;
}
function saveFiles(callback) {
    var tobesaved = false;
    // Though its overhead but check if something changed or not
    if (!codeeditor.getSession().getUndoManager().isClean()) {
            tobesaved = true;
    }
    if (!tobesaved) {
        // There is nothing to be saved
        callback(true);
    }
   // Check if this was changed or not.
    if (!codeeditor.getSession().getUndoManager().isClean()) {
            var content = codeeditor.getValue();
            // Make Ajax call to save file
            var url = SERVER + "/save_file.php";
            var inputs = { "langid": langid, "content": content };

            // Mark this content saved
            codeeditor.getSession().getUndoManager().markClean();
            $.ajax({
                url: url,
                crossDomain: true,
                xhrFields: {
                   withCredentials: true
                },
                type: "POST",
                data: inputs,
                dataType:'json',
                beforeSend: function() {
                    $("#loading").css({
                        "visibility": "visible"
                    });
                },
                error:function (data, status, error) {
                   return false;
                },
                success: function(data) {
                    if (data.status) {
                        $.messager.alert('Error Message', data.message, 'error');
                    }
                    $("#loading").css({
                        "visibility": "hidden"
                    });
                    callback(true);
                }
            });
        }
}
function setEditorTheme(theme) {
    editor_theme = theme;
    codeeditor.setTheme("ace/theme/" + editor_theme);
    setCookie("editor_theme", editor_theme);
}

function setEditorType(type) {
    editor_type = type;
    var handler;
    if (editor_type === "vim") {
        handler = require("ace/keyboard/vim").handler;
    }
    if (editor_type === "emacs") {
        handler = require("ace/keyboard/emacs").handler;
    }
    if (editor_type === "ace") {
        handler = null;
    }
    codeeditor.setKeyboardHandler(handler);
    setCookie("editor_type", editor_type);
}

function setEditorFontSize(size) {
    editor_font_size = parseInt(size);
    codeeditor.setFontSize(editor_font_size);
    setCookie("editor_font_size", size);
}

function setEditorTabSize(size) {
    editor_tab_size = parseInt(size);
    codeeditor.getSession().setTabSize(editor_tab_size);
    setCookie("editor_tab_size", size);
}

function setEditorInvisible(flag) {
    editor_invisible = flag;
    codeeditor.setShowInvisibles(flag);
    setCookie("editor_invisible", flag);
}

function setEditorGutter(flag) {
    editor_gutter = flag;
    codeeditor.renderer.setShowGutter(flag);
    setCookie("editor_gutter", flag);
}
function setTerminalMode(mode) {
    if( langid === "latex" || langid === "tex" ){
       $(".icon-v-terminal").hide();
       $(".icon-h-terminal").hide();
       return;
    }
    if( mode === "H" ){
       var wh = $('#cc').height();
       var sh = wh * 40 / 100;
       var content = $("#east").html();
       $("#cc").layout('panel', 'south').panel({'maxHeight': '10000'});
       $("#cc").layout('panel', 'south').panel('resize', {height:sh});
       $("#cc").layout('panel', 'south').panel({'title': 'Result'});
       $("#cc").layout('panel', 'south').panel({'iconCls': 'icon-result'});
       $("#cc").layout('panel', 'east').panel({'width': '1'});
       $("#cc").layout('panel', 'east').panel({'maxWidth': '1'});
       $("#cc").layout('panel', 'east').panel({'title': ''});
       $("#cc").layout('panel', 'east').panel({'iconCls': ''});
       
       $("#cc").layout('resize');
       $("#devices").height( $('#east').height() - 29);
        contentcover =  $("#southcover");
        contentframe =  $("#southframe");
       $("#loading").css( {"top":"75%", "left":"50%"});
    }
    if( mode === "V" ){
       var content = $("#south").html();
       $("#cc").layout('panel', 'east').panel({'maxWidth': '10000'});
       $("#cc").layout('panel', 'east').panel('resize', { width:'50%'});
       $("#cc").layout('panel', 'east').panel({'title': 'Result'});
       $("#cc").layout('panel', 'east').panel({'iconCls': 'icon-result'});
       $("#cc").layout('panel', 'south').panel({'height': '1'});
       $("#cc").layout('panel', 'south').panel({'maxHeight': '1'});
       $("#cc").layout('panel', 'south').panel({'title': ''});
       $("#cc").layout('panel', 'south').panel({'iconCls': ''});
       $("#cc").layout('resize');
       $("#devices").height( $('#east').height());
       contentcover =  $("#eastcover");
       contentframe =  $("#eastframe");
       $("#loading").css( {"top":"50%", "left":"75%"});
    }
    terminal_mode = mode;
}
