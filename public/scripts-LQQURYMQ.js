const customInitFunctions=()=>{$(function(){"use strict";$(function(){$(".preloader").fadeOut()}),jQuery(document).on("click",".mega-dropdown",function(i){i.stopPropagation()});var s=function(){var i=window.innerWidth>0?window.innerWidth:this.screen.width,a=0;i<1170?($("body").addClass("mini-sidebar"),$(".navbar-brand span").hide(),$(".sidebartoggler i").addClass("ti-menu")):($("body").removeClass("mini-sidebar"),$(".navbar-brand span").show());var e=(window.innerHeight>0?window.innerHeight:this.screen.height)-1;e=e-a,e<1&&(e=1),e>a&&$(".page-wrapper").css("min-height",e+"px")};$(window).ready(s),$(window).on("resize",s),$(".sidebartoggler").on("click",function(){$("body").hasClass("mini-sidebar")?($("body").trigger("resize"),$("body").removeClass("mini-sidebar"),$(".navbar-brand span").show()):($("body").trigger("resize"),$("body").addClass("mini-sidebar"),$(".navbar-brand span").hide())}),$(".nav-toggler").click(function(){$("body").toggleClass("show-sidebar"),$(".nav-toggler i").toggleClass("ti-menu"),$(".nav-toggler i").addClass("ti-close")}),$(".search-box a, .search-box .app-search .srh-btn").on("click",function(){$(".app-search").toggle(200)}),$(".right-side-toggle").click(function(){$(".right-sidebar").slideDown(50),$(".right-sidebar").toggleClass("shw-rside")}),$(".floating-labels .form-control").on("focus blur",function(i){$(this).parents(".form-group").toggleClass("focused",i.type==="focus"||this.value.length>0)}).trigger("blur"),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$(function(){$('[data-toggle="popover"]').popover()}),$(function(){$("#sidebarnav").AdminMenu()}),$(".scroll-sidebar, .right-side-panel, .message-center, .right-sidebar").perfectScrollbar(),$("body").trigger("resize"),$(".list-task li label").click(function(){$(this).toggleClass("task-done")}),$('a[data-action="collapse"]').on("click",function(i){i.preventDefault(),$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("ti-minus ti-plus"),$(this).closest(".card").children(".card-body").collapse("toggle")}),$('a[data-action="expand"]').on("click",function(i){i.preventDefault(),$(this).closest(".card").find('[data-action="expand"] i').toggleClass("mdi-arrow-expand mdi-arrow-compress"),$(this).closest(".card").toggleClass("card-fullscreen")}),$('a[data-action="close"]').on("click",function(){$(this).closest(".card").removeClass().slideUp("fast")})})};customInitFunctions(),window.customInitFunctions=customInitFunctions;
