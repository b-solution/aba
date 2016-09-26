//Template settings
var templateFolderName = "abacus_office_blues",
	removeSystemJQueryAddTemplateJQuery = "no",
	customMenuPlugin = "yes",
	hostingDemoRedmine = "yes",
	removeRedmineResponsiveScripts = "yes",
	removeDuplicateIds = "no";


// GLOBAL FUNCTIONS
// ********************************** START -  JS Prepared functions **********************************
var regex = /(<([^>]+)>)/ig;

var togglePlusMinus = function (button) {
	if ($(button).hasClass("fa-minus-square")) {
		$(button).removeClass("fa-minus-square").addClass("fa-plus-square");
	} else {
		$(button).removeClass("fa-plus-square").addClass("fa-minus-square");
	}
};

// ********************************** END - JS Prepared functions **********************************


// ********************************** END - JS Plugin hotFixes **********************************
// GLOBAL FUNCTIONS END


// ** LOAD ******************************** START - All start on document load **********************************
var onLoadScript = function () {
	console.log("Load scripts on document load " + new Date());

	//Mobile view - add to head
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');
	
	//Favicon - add to head
	// $('head').append('<link rel="shortcut icon" href="../images/favicon.ico" />');


};

window.onload = onLoadScript();

// ** LOAD ******************************** END - All start on document load **********************************


// ** READY ******************************** START - All start on document ready ********************************
$(document).ready(function () {
	console.log("Load scripts on document ready " + new Date());

	// ********************************** START -  JS Plugin hotFixes **********************************

	/* PLUGIN - Extra Queries plugin - http://rmplus.pro/ */
	//Fix duplication of ID in issue list
	// find in list issues issue all td.id and remove second if tr contains Two id
	if (removeDuplicateIds === "yes") {
		var removeDuplicateID = function () {
			var $issuesDuplicatedID = $(".action-page .list.issues tr");
			$issuesDuplicatedID.each(function () {
				$(this).find('th:eq(1),td:eq(1)').remove();
			});
		};
		removeDuplicateID();
	}


	/* PLUGIN - Custom Menu plugin - http://rmplus.pro/ */
	var removeAllCustomMenuComponents = function () {
		// Remove script from custom menu plugin if disable but instaled in system
		$("script[src^='/plugin_assets/custom_menu/']").each(function () {
			$(this).remove();
		});
		$("link[href^='/plugin_assets/custom_menu/']").each(function () {
			$(this).remove();
		});
		// Remove menu link from admin menu
		$('#admin-menu li').has("a.cm-menu").remove();
	};

	// ********************************** START SETTINGS - Some Functions depending on JS settings **********************************
	if (removeSystemJQueryAddTemplateJQuery === "yes") {
		//Fix Jquery package for all redmines
		$("link[href^='/stylesheets/jquery/jquery-ui-1']").each(function () {
			$(this).remove();
		});
		$('head').append('<script src="/themes/' + templateFolderName + '/javascripts/jquery/jquery-1.11.1-ui-1.11.0-ujs-3.1.1.js"></script>');
		$('head').append('<link rel="stylesheet" media="all" href="/themes/' + templateFolderName + '/stylesheets/jquery/jquery-ui-1.11.0.css" />');

		$("script[src^='/javascripts/jquery-1.']").each(function () {
			$(this).remove();
		});
	}

	if (removeRedmineResponsiveScripts === "yes") {
		$("link[href^='/stylesheets/responsive.css']").each(function () {
			$(this).remove();
		});
	}

	if (customMenuPlugin === "yes") {

	}

	if (hostingDemoRedmine === "yes") {
		// Check domain add class to demo login bg
		var locUrl = window.location.href; // returns the full URL
		var originUrl = "http://demo.abacusthemes.com/login";
		if (locUrl == originUrl) {
			$('body.action-login #main').addClass('loginbg');
		}
	}
// ********************************** END SETTINGS - Some Functions depending on JS settings **********************************


	// Add "backlink" to the footer
	$('#footer .bgr').append('<span>| Theme by <a  href="http://www.abacusthemes.com" target="_blank" property="Michal Stanek">Abacus Themes</a>');


	// ********************************** HOMEPAGE **********************************
	//  Left Right hide function if empty and add class for full width
	var hideSplitContentLeft = function () {
		var $content_splitContentLeft = $('.splitcontentleft');
		$content_splitContentLeft.each(function () {
			if ($(this).html().replace(regex, "").trim().length === 0) {
				$(this).addClass("hidden");
			} else {
				$(this).addClass("visible");
			}
		});
	};
	var hideSplitContentRight = function () {
		var $content_splitContentRight = $('.splitcontentright');
		$content_splitContentRight.each(function () {
			if ($(this).html().replace(regex, "").trim().length === 0) {
				$(this).addClass("hidden");
			} else {
				$(this).addClass("visible");
			}
		});
	};

	hideSplitContentLeft();
	hideSplitContentRight();

	$("body").bind('DOMNodeInserted DOMNodeRemoved', function (event) {
		setTimeout(function () {
			hideSplitContentLeft();
			hideSplitContentRight();
		}, 2000);

	});

	// ********************************** Contextual container **********************************
	//If contextual menu empty, add hidden
	var $content_contextualContainer = $('#content > .contextual');

	var hideContextual = function () {
		$content_contextualContainer = $('#content > .contextual');
		$content_contextualContainer.each(function () {
			if ($(this).html().replace(regex, "").trim().length === 0) {
				$(this).addClass("hidden");
			} else {
				$(this).removeClass("hidden");
			}
		});
	};
	hideContextual();

	$content_contextualContainer.bind('DOMNodeInserted DOMNodeRemoved', function (event) {
		hideContextual();
	});

	//top menu --> add Issues and Spent time
	if ($('#top-menu ul').hasClass('cm-menu-header')) {
		console.log("Custom menu plugin enable");

		// ********************************** Custom menu plugin JS **********************************

		if ($('.menu_expander .icon-expand').length >= 0) {
			$('body').addClass('redmine_custom_menu');
		}

		// Add class menu_fixed if custom menu plugin exists
		if ($('#dropdown_top_menu').length >= 0) {
			$('body').addClass('menu_fixed');
		}

		// Remove "more" menu item if custom menu plugin exists
		if ($('body').hasClass('redmine_custom_menu')) {
			$('#top-menu > ul div').removeClass('fa more');
		}


	} else {
		console.log("Custom menu plugin disable - load standard menu");
		removeAllCustomMenuComponents();


		//Append menu childs
		$("#top-menu > ul li:eq(2)").after(
			$('<li>').append(
				$('<a>').attr('href', '/issues').attr('class', 'issues fa df fa-tasks').append(
					$('<span>').append('Issues')
				)));

		$("#top-menu > ul li:eq(3)").after(
			$('<li>').append(
				$('<a>').attr('href', '/time_entries').attr('class', 'spent_time df fa fa-clock-o').append(
					$('<span>').append('Spent time')
				)));

		// Add class redmine_news_notification if plugin exists
		if ($('#nn_list').length !== 0) {
			$('body').addClass('redmine_news_notification');
		}
		
		// Add class tableless if login form has no table
		if ($('#login-form form table').length === 0) {		$('#login-form').addClass('tableless');
		}

		// Add class redmine_mobile_menu if menu exists (Redmine 3.2+)
		if ($('.flyout-menu').length !== 0) {
			$('body').addClass('redmine_mobile_menu');
		}

		// Add "more" menu item and wrap
		$('#top-menu>ul .more').append('<span>More</span>');

		$("#top-menu>ul").each(function () {
			$(this).children().each(function (i) {
				$(this).addClass("item-" + (i + 1));
			});
		});

		// Wrap 7th and more ul li with .more div for mobile display
		$("#top-menu > ul > li").slice(6, 100).wrapAll("<div class='more fa'></div>");

		//  Wrap .more li with .ul div for mobile display
		$(".more > li").wrapAll("<div class='ul' />");

	}

	// ********************************** End of Custom menu JS ************************************

	// Add class view-admin if admin menu exists
	if ($('#sidebar #admin-menu').length !== 0) {
		$('body').addClass('view-admin');
	}

	// Add class sidebar_handler if sidebar plugin exists
	if ($('#sidebarHandler').length !== 0) {
		$('body').addClass('sidebar_handler');
	}

	// Add sidebar hide if sidebar plugin does notexists
	if ($('#sidebarHandler').length === 0) {
		$('#content').append('<div id="hide-sidebar"><a class="switch" href="#"><i class="fa fa-eye"></i></a></div>');

		$('.switch').click(function () {
			$('#sidebar').toggleClass('hidden');
			$('#content').toggleClass('full');
		});
	}

	// Clear floating
	// $('#top-menu, #all_attributes, #main-menu ul, #main, .controller-projects.action-show #duplicates.box, .new_issue .splitcontentleft, .new_issue .splitcontentright, .controller-issues .contextual')
	//	.append('<div style="clear:both"></div>');

	$("#top-menu, #all_attributes, #main-menu ul, .controller-projects.action-show #duplicates.box, .new_issue .splitcontentleft, .new_issue .splitcontentright, .controller-issues .contextual, #header, div.topic ul.meta, .deal.details, .plupload_header_content").addClass("clearfix");

	/*Clear buttons*/
	$('.controller-calendars.action-show #year, .controller-gantts.action-show #year').after(
		$('<div class="divider">').append(
		));

	$("tr.issue.idnt td.subject a").addClass("fa fa-caret-right");

	$('.controller-timelog.action-index .total-hours,.controller-calendars.action-show #query_form,#tab-content-versions table,#tab-content-categories table,#tab-content-activities table,.controller-settings #tab-content-issues fieldset,.controller-settings #tab-content-repositories table,.controller-tt_overview table.tt_list, table.list, table.people, table.invoice-lines, .controller-orders #product_lines, table#browser').after(
		$('<p>').append(
			$('<span>').attr('class', 'slide').append(">>>>>> Slide to see table >>>>>>")
		));

	//Account and logged as :hover fix
	$('#account').attr("onclick", "return true");
	$('#loggedas a').attr("onclick", "return true");

	// Wrap Project calendar with .autoscroll
	$(".controller-calendars.action-show table.cal").wrap("<div class='autoscroll'></div>");

	// Wrap Invoice items with .autoscroll
	$(".controller-invoices fieldset.attributes").wrap("<div class='autoscroll'></div>");

	// Wrap table.list with autoscroll
	$("table.list, table.people").wrap("<div class='autoscroll'></div>");

	//top menu -more :hover fix
	$('#top-menu .more').attr("onclick", "return true");

	// Add target blank to external link
	$('a.external').attr('target', '_blank');

	// Redmine CRM add target blank to address
	$('.address.adr a').attr('target', '_blank');

	// Inoices add target blank to public URL
	$('.icon.icon-invoice-public-link').attr('target', '_blank');

	// Issue detail - add toggle Associated revisions link
	$('#issue-changesets').before($('<div class="toggle-wrap"><a class="fa fa-plus-square" id="show-issue-changesets">Toggle Associated revisions</a></div>'));
	$('#show-issue-changesets').click(function () {
		togglePlusMinus(this);
		$('#issue-changesets').slideToggle("fast");
	});

	// Issue detail - add class to history if changset exists
	if ($("#issue-changesets").length > 0) {
		$("#history").addClass("issue-changesets-exist");
	}

	// Main menu - toggle class active
	$('#main-menu').click(function () {
		$('#main-menu ul').toggleClass('active');
	});

	// Hide #main-menu if empty
	if ($('#main-menu ul').length === 0) {
		$('#main-menu').css({'visibility': 'hidden'});

		$('#main-menu').click(function () {
			$('#main-menu ul').removeClass("active");
		});
	}


	/*------------------Font Awesome------------------*/

	/*Top menu*/


	// Add "more" menu item and wrap
	$('#top-menu').append('<a href="/my/page" class="home-link"></a>');

	$("#top-menu > ul a").addClass("df");

	$("#top-menu a.home, .js-general-menu a.home").addClass("fa fa-home");

	$("#top-menu a.my-page, .js-general-menu a.my-page").addClass("fa fa-dashboard");

	$("#top-menu a.projects, .js-general-menu a.projects").addClass("fa fa-list");

	// $("#top-menu a.issues").addClass("fa fa-tasks");

	$("#top-menu a.spent_time").addClass("fa fa-clock-o");

	$("#top-menu a.contacts").addClass("fa fa-envelope");

	$("#top-menu a.time-tracker-main-menu").addClass("fa fa-play");

	$("#top-menu a.icon-pause-action").addClass("fa fa-play");

	$("#top-menu a.administration, .js-general-menu a.administration").addClass("fa fa-cog");

	$("#top-menu a.help, #top-menu a.questions, .js-general-menu a.help").addClass("fa fa-life-ring");

	$("#top-menu a.finance").addClass("fa fa-usd");

	$("#top-menu a.products").addClass("fa fa-gift");

	$("#top-menu a.orders").addClass("fa fa-shopping-cart");

	$("#top-menu a.archived-repositories").addClass("fa fa-archive");

	$("#top-menu a.invoices").addClass("fa fa-file-text-o");

	$("#top-menu a.expenses").addClass("fa fa-usd");

	$("#top-menu a.people").addClass("fa fa-users");

	$("#top-menu a.deals").addClass("fa fa-hand-o-right");

	$("#top-menu a.agile").addClass("fa fa-th-large");

	$("#deal_contact_id_add_link, #expense_contact_id_add_link, #invoice_contact_id_add_link").addClass("fa fa-plus-circle");

	$("#top-menu a.easy-gantt").addClass("fa fa-area-chart");

	/*Products*/
	$(".icon-order-add").addClass("fa fa-cart-plus");

	// Wrap Product items with .autoscroll
	$(".controller-orders #product_lines").wrap("<div class='autoscroll'></div>");

	/*User menu*/

	$("#top-menu #loggedas > a").addClass("fa fa-line-chart");
	$("#account, .icon-user").addClass("fa fa-user");

	/*Add icon - plus circle*/
	$("span.search_for_watchers a, .icon-add, span.add_attachment a, a#attach_files_link, #add_issue_link, #contact_projects .contextual a, #sidebar #watchers .contextual a, #deal_contacts .contextual a, #contact_issues .contextual a, #sidebar #accounts_stat .contextual a").addClass("fa fa-plus-circle");

	/*My Page*/

	$("div.projects h3").addClass("fa fa-list");

	$("div.news h3").addClass("fa fa-newspaper-o");

	$('.controller-my.action-page table.cal').closest("div").addClass("cal");

	$('.controller-my.action-page table.list').closest("div").addClass("list");


	/*Favourite icon - star*/
	$(".my-project, .icon-fav-off, .icon-fav").addClass("fa fa-star");


	/*Project*/
	$(".icon-lock").addClass("fa fa-lock");

	$(".icon-unlock").addClass("fa fa-unlock-alt");

	$(".icon-time, .icon-time-add").addClass("fa fa-clock-o");

	$("div.members h3, table.members td.group").addClass("fa fa-users");

	$("div.issues h3, dt.issue").addClass("fa fa-file-text-o");

	$("dt.icon-product").addClass("fa fa-shopping-cart");

	$("dt.icon-add-payment, dt.icon-invoice").addClass("fa fa-file-text-o");

	$("dt.icon-expense").addClass("fa fa-usd");

	$(".contextual > a[href='/issues']").addClass("fa fa-tasks");

	$(".contextual > a[href='/time_entries']").addClass("fa fa-clock-o");

	$(".contextual > a[href='/activity']").addClass("fa fa-line-chart");

	$(".icon-dd-menu").addClass("fa fa-arrow-down");


	/*Icon check - Apply*/
	$(".icon-checked, table.list th.checkbox a, div.flash.notice").addClass("fa fa-check");

	$("div.flash.error, #errorExplanation ul li, em.info.error").addClass("fa fa-exclamation-circle");

	$("div.flash.warning, .conflict, .icon-warning").addClass("fa fa-exclamation-triangle");

	$("div.flash.tip").addClass("fa fa-lightbulb-o");

	$("div.flash.info").addClass("fa fa-info-circle");


	/*Icon delete*/
	$(".delete, .icon-del, #query_form .icon-reload, a.remove-upload, .close-icon").addClass("fa fa-times");

	$("#sidebar #watchers .delete").removeClass("fa fa-times");

	/*Removes class icon reload from issue list Clear - Redmine puts wrong class*/
	$("#query_form .icon-reload").removeClass("icon-reload");

	/*Icon save*/
	$(".icon-save, .controller-my.action-page_layout .contextual .icon-cancel").addClass("fa fa-floppy-o");

	/*Calendar*/
	$("table.cal .ending a, p.cal.legend .ending").addClass("fa fa-arrow-circle-left");

	$("table.cal .starting a, p.cal.legend .starting").addClass("fa fa-arrow-circle-right");

	$("table.cal .starting.ending a, p.cal.legend .starting.ending").addClass("fa fa-bullseye");


	/*Project summary + Gantt*/
	$(".controller-reports h3 a, .icon-zoom-in").addClass("fa fa-search-plus");

	/*Gantt*/
	$(".icon-zoom-out").addClass("fa fa-search-minus");

	$(".icon-projects").addClass("fa fa-list");

	$(".icon-package").addClass("fa fa-suitcase");

	$(".controller-gantts.action-show #content table:first-of-type").wrap("<div class='autoscroll'></div>");

	/*Attachment*/
	$(".icon-attachment").addClass("fa fa-paperclip");


	/*Issues*/
	$(".icon-copy").addClass("fa fa-files-o");

	$("a.collapsible").addClass("fa fa-minus-square").click(function () {
		togglePlusMinus(this);
	});

	$("fieldset.collapsible").each(function () {
		console.log(this);
		if ($(this).hasClass('collapsed')) {
			$(this).find('> legend').addClass("fa fa-plus-square").click(function () {
				togglePlusMinus(this);
			});
		} else {
			$(this).find('> legend').addClass("fa fa-minus-square").click(function () {
				togglePlusMinus(this);
			});
		}
	});

	$("#history div.journal .wiki.editable .contextual a:first-child").addClass("fa fa-comment");

	$("#history div.journal .wiki.editable .contextual a:nth-child(2)").addClass("fa fa-pencil-square-o");

	$("#relations tr.issue .buttons a").addClass("fa fa-times");

	$("#relations .contextual > a, #issue_tree .contextual > a").addClass("fa fa-plus-circle");


	$("div.issue .description .contextual .icon-comment").addClass("fa fa-comment");
	$(".issue .attachments .contextual > a, .message .attachments .contextual > a").addClass("fa fa-pencil-square-o");
	$(".fa-comment, .fa-pencil-square-o").find("img").remove();
	/*Documents*/

	// News - add toggle news
	$('.controller-documents.action-index #content > .contextual a:first-child').before($('<a class="toggle-wrap fa fa-plus-square" id="show-docs">Toggle descriptions</a>'));
	
	  $(".controller-documents.action-index #content div.wiki, .controller-news.action-index #content div.wiki").hide();
	  $(".controller-news #content #add-news div.wiki").show();
	  
	  $('#show-docs').click(function () {
		togglePlusMinus(this);
		$('.controller-documents #content div.wiki').slideToggle("fast");
	});

	$("#content div.attachments .contextual > a").addClass("fa fa-pencil-square-o");

	$("#content #comments .contextual > a").addClass("fa fa-times");

	/*Edit Issue + Project Settings*/
	$(".edit_issue #all_attributes > p:nth-child(5) a, .icon-edit").addClass("fa fa-pencil-square-o");

	$("button.tab-left").addClass("fa fa-caret-left");

	$("button.tab-right").addClass("fa fa-caret-right");


	/*Project*/

	// Project - add toggle news if RedmineCRM project plugin does not exist
	if ($('.controller-projects.action-index #projects_list').length === 0) {
		$('.controller-projects.action-index #content > .contextual a:first-child').before($('<a class="toggle-wrap fa fa-plus-square" id="show-project-desc">Toggle descriptions</a>'));

	  $("#projects-index ul.projects .wiki.description").hide();	$('#show-project-desc').click(function () {
			togglePlusMinus(this);
			$('#projects-index .wiki.description').slideToggle("fast");
		});
	}

	if ($('.controller-projects.action-index #projects_list').length !== 0) {
		$('body').addClass('projects_list');
	}

	/*News*/

	// News - add toggle news
	$('.controller-news.action-index #content > .contextual a:first-child').before($('<a class="toggle-wrap fa fa-plus-square" id="show-news">Toggle descriptions</a>'));

	$('#show-news').click(function () {
		togglePlusMinus(this);
		$('.controller-news.action-index #content .wiki ').slideToggle("fast");
	});

	$("h3.comments, table.boards a.board").addClass("fa fa-comments-o");


	/*Documents*/
	$(".controller-documents .attachments p a:nth-child(2), .controller-wiki .attachments p a:nth-child(2), input#contact_company").addClass("fa fa-search");


	/*Wiki*/
	$(".icon-move").addClass("fa fa-arrow-right");

	$("#main .icon-history").addClass("fa fa-history");

	// $(".controller-wiki .contextual a:first-child").addClass("fa fa-pencil-square-o");


	/*Forum*/
	$(".icon-comment, .controller-messages .message.reply > .contextual a:nth-child(1)").addClass("fa fa-comment");

	$(".icon-vote, .icon-unvote").removeClass("fa fa-comment");

	$(".vote, .icon-vote, .icon-unvote").addClass("fa fa-thumbs-o-up");

	$(".icon-view").addClass("fa fa-bullseye");

	$(".icon-tag").addClass("fa fa-tag");

	$(".controller-messages .message.reply > .contextual a:nth-child(2)").addClass("fa fa-pencil-square-o");

	$(".controller-messages .message.reply > .contextual a:nth-child(3)").addClass("fa fa-times");

	// Add class view-admin if admin menu exists
	if ($('.controller-messages .message.reply > .contextual .vote').length !== 0) {

		$('.controller-messages .message.reply > .contextual a:nth-child(2)').removeClass('fa-pencil-square-o');
		$('.controller-messages .message.reply > .contextual a:nth-child(2)').addClass('fa-comment');

		$('.controller-messages .message.reply > .contextual a:nth-child(3)').removeClass('fa-times');
		$('.controller-messages .message.reply > .contextual a:nth-child(3)').addClass('fa-pencil-square-o');

		$('.controller-messages .message.reply > .contextual a:nth-child(4)').addClass('fa fa-times');
	}

	$("table.list.files td.buttons a").addClass("fa fa-times");

	/*Admin*/
	$('.view-admin #content > h2').after($('<a class="menu-wrap fa fa fa-list" href="#admin-menu">Menu</a>'));


	/*Redmine CRM*/
	$(".subject_header li.icon-email, .icon-contact, .icon-vcard").addClass("fa fa-envelope");

	$(".subject_header li.icon-phone").addClass("fa fa-phone");

	$(".controller-contacts #comments .contextual a:first-child").addClass("fa fa-pencil-square-o");

	$(".controller-contacts #comments .contextual a:last-child").addClass("fa fa-times");

	$(".controller-contacts .sidebar td.address a, .controller-people #sidebar td.address a").addClass("fa fa-map-marker");

	$("a.external").addClass("fa fa-external-link");


	/*Redmine CRM Pro (Contacts, Deals, Invoices)*/
	$(".icon-import").addClass("fa fa-cloud-upload");

	$(".icon-email").addClass("fa fa-envelope");

	$(".controller-contacts .contextual .icon-user").addClass("fa fa-user-plus");

	$("#edit_tags_link").addClass("fa fa-pencil-square-o");

	$(".price.icon-money-dollar").addClass("fa fa-money");

	$(".price.icon-date").addClass("fa fa-calendar");

	$(".price.icon-rosette").addClass("fa fa-pie-chart");

	$(".icon-duplicate").addClass("fa fa-files-o");

	$("#show_note_form_extras").addClass("fa fa-plus-square");

	$(".icon-call").addClass("fa fa-phone");

	$(".icon-email").addClass("fa fa-envelope");

	$(".icon-meeting").addClass("fa fa-calendar");

	$(".controller-deals #comments .contextual a:first-child").addClass("fa fa-pencil-square-o");

	$("#admin-menu a.helpdesk").addClass("fa fa-life-ring");

	$("#admin-menu a.invoices").addClass("fa fa-file-text-o");

	$("#admin-menu a.finance").addClass("fa fa-usd");

	$("#admin-menu a.redmine-git-hosting").addClass("fa fa-git-square");

	$("#admin-menu a.login-audit").addClass("fa fa-sign-in");

	$("#admin-menu a.people").addClass("fa fa-users");

	$("#admin-menu a.products").addClass("fa fa-shopping-cart");

	$(".icon.icon-pdf").addClass("fa fa-file-pdf-o");

	$(".icon.icon-add-payment").addClass("fa fa-usd");

	$("#deals .contextual a").addClass("fa fa-plus-circle");

	$("#invoice_payments .contextual > a").addClass("fa fa-times");

	$(".controller-invoices #comments .contextual > a").addClass("fa fa-times");

	$("#invoice_payments h3").addClass("fa fa-money");

	//  Wrap #comments and #invoice_payments
	$(".controller-invoices #comments, .controller-invoices #invoice_payments").wrapAll("<div class='invoice-wrapper clearfix' />");


	/*Redmine Helpdesk*/
	$(".icon-email-spam").addClass("fa fa-envelope-square");

	$(".icon-email-to").addClass("fa fa-envelope");

	$("#ticket_data .attachment a:last-child").addClass("fa fa-search");

	$(".phone, .icon-phone").addClass("fa fa-phone");

	$(".icon-helpdesk").addClass("fa fa-ticket");

	$(".icon-company-contact").addClass("fa fa-user");


	/*Redmine People*/
	$(".person.details").addClass("autoscroll");


	/*Custom menu icons*/
	$(".cm-all-projects").addClass("fa fa-list");

	$("#admin-menu a.cm-menu").addClass("fa fa-list-alt");


	/*Search*/
	$("dt.wiki-page").addClass("fa fa-font");

	$("dt.document").addClass("fa fa-file-text-o");

	$("dt.project").addClass("fa fa-list");


	/*Spent time*/
	$(".time-entries td.buttons a:first-child").addClass("fa fa-pencil-square-o");

	$(".time-entries td.buttons a:last-child").addClass("fa fa-times");

	/*Administration*/
	$("#admin-menu a.projects").addClass("fa fa-list");

	$("#admin-menu a.users").addClass("fa fa-user");

	$("#admin-menu a.groups").addClass("fa fa-users");

	$("#admin-menu a.roles").addClass("fa fa-database");

	$("#admin-menu a.trackers").addClass("fa fa-square");

	$("#admin-menu a.issue_statuses").addClass("fa fa-file-text-o");

	$("#admin-menu a.workflows").addClass("fa fa-hand-o-right");

	$("#admin-menu a.custom_fields").addClass("fa fa-caret-square-o-right");

	$("#admin-menu a.enumerations").addClass("fa fa-list-ol");

	$("#admin-menu a.settings").addClass("fa fa-cog");

	$("#admin-menu a.server_authentication").addClass("fa fa-key");

	$("#admin-menu a.contacts").addClass("fa fa-envelope");

	$("#admin-menu a.approvalworkflows").addClass("fa fa-file-text-o");

	$("#admin-menu a.plugins").addClass("fa fa-puzzle-piece");

	$("#admin-menu a.info").addClass("fa fa-info-circle");

	$("#admin-menu a.cms").addClass("fa fa-desktop");

	$(".icon-reload").addClass("fa fa-refresh");

	$(".icon-next").addClass("fa fa-arrow-right");

	$(".icon-previous").addClass("fa fa-arrow-left");


	/*Reorder icons*/
	$("table.list td.reorder a:nth-child(1)").addClass("fa fa-arrow-circle-up");

	$("table.list td.reorder a:nth-child(2)").addClass("fa fa-chevron-up");

	$("table.list td.reorder a:nth-child(3)").addClass("fa fa-chevron-down");

	$("table.list td.reorder a:nth-child(4)").addClass("fa fa-arrow-circle-down");

	$(".icon-summary").addClass("fa fa-pie-chart");

	$(".controller-workflows form p a, tr span.expander").addClass("fa fa-plus-square");
	$(".controller-workflows form p a, tr span.expander").click(function () {
		togglePlusMinus(this);
	});

	$("#commit-keywords td.buttons a.delete-commit-keywords").addClass("fa fa-times");


	$("#commit-keywords td.buttons a.add-commit-keywords").addClass("fa fa-plus-circle");

	$(".icon-test").addClass("fa fa-arrow-right");

	/*File icons*/
	$(".icon-file, .icon-file.text-plain, .icon-file.text-x-csharp, .icon-file.text-x-c, .icon-file.text-x-java, .icon-file.text-x-javascript, .icon-file.text-x-php, .icon-file.text-x-ruby, .icon-file.text-xml").addClass("fa fa-file");

	$(".icon-file.text-css").addClass("fa fa-css3");

	$(".icon-file.text-html").addClass("fa fa-html5");

	$(".icon-file.image-gif, .icon-file.image-jpeg, .icon-file.image-png, .icon-file.image-tiff").addClass("fa fa-file-image-o");

	$(".icon-file.application-pdf").addClass("fa fa-file-pdf-o");

	$(".icon-file.application-zip, .icon-file.application-x-gzip").addClass("fa fa-file-archive-o");

	$(".icon-folder").addClass("fa fa-folder-o");

	/*Users*/
	$("dt.issue-note, dt.issue-edit, dt.issue-closed, dt.issue-note, #search-results dt.issue.closed").addClass("fa fa-file-text-o");

	$("dt.icon-add-deal").addClass("fa fa-money");

	$("dt.time-entry").addClass("fa fa-clock-o");

	$("dt.changeset").addClass("fa fa-cog");

	$("dt.news").addClass("fa fa-newspaper-o");

	$("dt.message, dt.reply").addClass("fa fa-comment");

	$("dt.attachment").addClass("fa fa-paperclip");

	$(".icon-passwd").addClass("fa fa-key");

	$(".icon-email-add").addClass("fa fa-envelope-o");

	/*Footer*/
	$("a.atom").addClass("fa fa-rss-square");

	$("a.csv").addClass("fa fa-database");

	$("a.pdf").addClass("fa fa-file-pdf-o");

	$("a.vcf").addClass("fa fa-user");

	$("a.xls").addClass("fa fa-file-excel-o ");

	/*Agile*/
	$("#admin-menu a.agile").addClass("fa fa-th-large");

	$(".icon-fullscreen").addClass("fa fa-arrows-alt");

	$('.agile-board > .autoscroll').append('<span class="esc"><strong>Esc </strong> = Exit Fullscreen');

	/*Extra queries*/
	$("a.eq-pin").addClass("fa fa-star-o");

	/*DMSF plugin*/
	// Wrap DMSF table with .autoscroll
	$(".dmfs_entries table").wrap("<div class='autoscroll'></div>");

	$(".icon-dmsf-lock").addClass("fa fa-lock");

	$(".icon-notification-off").addClass("fa fa-envelope");

	$(".icon-notification-on").addClass("fa fa-envelope-o");

	$(".ui-icon-circle-plus").addClass("fa fa-plus-circle");

	$(".ui-icon-circle-arrow-e").addClass("fa fa-upload");

	$(".ui-icon-circle-close").addClass("fa fa-times-circle");

	$(".controller-dmsf #content > .contextual .icon-link").addClass("fa fa-external-link");


	/*Easy Gantt plugin*/
	$(".icon-calendar").addClass("fa fa-calendar");

	$(".gantt-menu-button.save").addClass("fa fa-floppy-o");

	$(".gantt-menu-button.icon-back").addClass("fa fa-arrow-left");

	$(".gantt-menu-button.icon-stats").addClass("fa fa-user");

	$(".gantt-menu-button.icon-print").addClass("fa fa-print");

	$(".gantt-menu-button.icon-summary").removeClass("fa-pie-chart");

	$(".gantt-menu-button.icon-summary").addClass("fa-exclamation-circle");


	/* Project tree toggle */
	// Init hide All projects under ROOT folder
	$(".controller-projects ul.projects.root > .root  ul").hide();
	$("ul.projects li:has('a.parent')").addClass("fa fa-chevron-circle-down");

	$("ul.projects li > div:has('a.parent')").click(function () {
		$(this).parent().toggleClass("fa fa-chevron-circle-down").toggleClass("fa fa-chevron-circle-up");
		$(this).next("ul").toggle();
	});


	// ********************************** End of JS D ready ********************************
});

// ********************************** Start of JS W scroll ********************************

$(window).scroll(function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 100) {
		$("#sidebar").addClass("fixed");
	} else {
		$("#sidebar").removeClass("fixed");
	}
});

// ********************************** End of JS W scroll ********************************


// ** READY ******************************** END - All start on document ready **********************************