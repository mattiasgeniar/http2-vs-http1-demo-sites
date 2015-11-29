jQuery( document ).ready(function($)
{

	jQuery('.js-lazyYT', this).lazyYT('AIzaSyBvJYy8lfD-skhMauKzuHESmYJeiBDuPBk', {
		youtube_parameters: 'rel=0&enablejsapi=1'
	});

	$( '.nav.nav-tabs.table-tabs > li > a' ).each(function()
	{
		var str = $( this ).attr( 'href' );

		var paneID = str.substring( str.indexOf( '#' ) + 1 );

		var pane = $('.tab-content .tab-pane[id="' + paneID + '"]');

		if ( pane.length == 0 )
		{
			$(this).closest('li').hide();
		};

		
	});
});

/*
------------------------------------------------------------------------------------------------------------------------
 ordered Domains
------------------------------------------------------------------------------------------------------------------------
*/

jQuery( document ).ready(function($)
{
	if ($('#orderedDomainsListContainer').length) {
		var container = $('#orderedDomainsListContainer');
		container.affix({
			offset: { top: container.offset().top - 10 }
		});
	}

	$('[data-toggle=popover]').popover();

    $('#searchQuery').keyup(function(){
        var list = $('ul#tldList li');
        var value = $(this).val();
        var query = new RegExp($(this).val(), 'i');

        // select all-category
        $('ul#categoryList li').removeClass('active');
        $('ul#categoryList li a[data-category=all]').parent('li').addClass('active')

        // Only filter when we have a match
        if(!value){
            list.show();
            return;
        }

        // Search for matches
        var matches = list.filter(function(index, el){
            var tld = $(el).data('tld');
            return query.test(tld);
        });
        list.hide();
        matches.show();
    });

    $('#enteredDomain').keyup(function(){
        var value = $(this).val()
        $('.enteredDomain').text(value);
        if(value.length > 2){
            $('.step2').removeClass('hidden');
        } else {
            $('.step2').addClass('hidden');
        }


        if(value.match(/\./)){
            $('.step2').addClass('hidden');
            $('#enteredDomainError').removeClass('hidden').html( '<h4>Oeps!</h4><br>' + 'U hebt een volledige domeinnaam ingegeven! Gelieve enkel de domain in te geven zonder www of extentie (.be, .com, ...). U de kan gewenste extenties in de lijst aan uw rechterkant selecteren. <br><strong>Goed:</strong> nucleus, hosting, ...<br><strong>Fout:</strong> www.nucleus.be, hosting.com, ...<br>' );
            return;
        } else {
            $('.step2').removeClass('hidden');
            $('#enteredDomainError').addClass('hidden');
        }

        if(value.match(/[^a-zA-Z0-9\-]/)){
            $('.step2').addClass('hidden');
            $('#enteredDomainError').removeClass('hidden').html( '<br><h4>Oeps!</h4><br>Dit is geen geldige domeinnaam!' );
        }
    });

    $('ul#tldList li.reg').click(function() {
        window.open("https://order.nucleus.be/");
    });

    $('ul#tldList li.prereg').click(function(){
        $(this).toggleClass('selected');

        if ( $(this).hasClass( 'selected' ) )
        {
        	$(this).append( '<em class="icon-check icon-2x pull-right"></em>' );

        }

        else
        {
        	$(this).find( '.icon-check' ).remove();
        }

        var selectedTlds = $('#selectedTlds').data('tlds');
        var tldId = $(this).data('tld-id');
        var tld = $(this).data('tld');
        var index = selectedTlds.indexOf(tldId);
        var enteredDomain = $('#enteredDomain').val();

        if(index >= 0){
            $('#orderedDomainsList li[data-tld-id='+tldId+']').remove();
            selectedTlds.splice(index, 1);
        } else {
            $('#orderedDomainsList').append('<li data-tld-id="'+tldId+'"><a><span class="muted">www.<span class="enteredDomain">'+enteredDomain+'</span></span>.'+tld+'</a></li>');
            selectedTlds.push(tldId);
        }
        $('#selectedTlds').data('tlds', selectedTlds);
        $('#selectedTlds').val(selectedTlds);

        if(selectedTlds.length > 0){
            $('#orderedDomainsListContainer li[data-placeholder]').hide();
            $('#orderedDomainsListContainer button').removeClass('hidden');
        } else {
            $('#orderedDomainsListContainer li[data-placeholder]').show();
            $('#orderedDomainsListContainer button').addClass('hidden');
        }

    });

    $('ul#categoryList li a').click(function(){

        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent('li').addClass('active');

        // Empty the search form
        $('#searchQuery').val('');

        var list = $('ul#tldList li');
        var categoryId = $(this).data('category');

        if(categoryId == 'all'){
            list.show();
            return false;
        }

        var falseMatches = list.filter(function(){
            var categories = $(this).data('categories');
            return categories.indexOf(categoryId) < 0;
        });
        var matches = list.filter(function(){
            var categories = $(this).data('categories');
            return categories.indexOf(categoryId) >= 0;
        });

        matches.show();
        falseMatches.hide();

        return false;

    });

});

/*
------------------------------------------------------------------------------------------------------------------------
 Core
------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Initialize $.CORE in case it's not present
 */
if (typeof $.CORE === "undefined") {
	$.CORE = Object;
}

/**
 * Forms
 */
$.CORE.forms = {
	construct : function () {
		this.execFormCheckerPlugin();
	},
	execFormCheckerPlugin : function () {
		var $formRef = $('form.formGenerated');
		if ($formRef.length) {
			$formRef.formChecker();
		}
	}
};


/**
 * Mobilemenu
 */
$.CORE.mobilemenu = {
	construct : function () {
		this.execMobileMenu();
	},
	execMobileMenu : function () {
	    $visibleMenu = $('#smartphonemenu').is(':visible');
	    $menuHeight = $('#smartphonemenu').outerHeight();
	    if ($visibleMenu && $menuHeight > 30 ) {
		$('.container.home, .container.view').addClass('smartPhoneMenuDouble');
		$('.container.home, .container.view').removeClass('smartPhoneMenuNormal');
	    } else if ($visibleMenu && $menuHeight <= 30 ) {
		$('.container.home, .container.view').addClass('smartPhoneMenuNormal');
		$('.container.home, .container.view').removeClass('smartPhoneMenuDouble');
	    } else if (!$visibleMenu) {
		$('.container.home, .container.view').removeClass('smartPhoneMenuDouble smartPhoneMenuNormal');
	    }
	}
};

/**
 * Classes
 */
$.CORE.dropdownToggle = {
	construct : function () {
		this.execDropdownToggle();
	},
	execDropdownToggle : function () {
	    $('.touch #mainmenu .dropdown-submenu').dropdown('toggle');
	}
};

/**
 * Carousel
 */
$.CORE.carousel = {
	construct : function () {
		this.execCarousel();
	},
	execCarousel : function () {
		$('#header-carousel, #did-you-know').carousel({
            interval: 10000
        });
	}
};


/**
 * Twitter
 */
$.CORE.twitter = {
	construct : function () {
		this.execTwitterLoad();
	},
	execTwitterLoad : function () {
		if ($('#ajax-tweet-footer').length){
		    $language = $('#ajax-tweet-footer').attr('rel');
		    $('#ajax-tweet-footer').load('/' + $language + '/index/twitter');	
		}
		
		if ($('#ajax-tweet-home').length){
		    $language = $('#ajax-tweet-home').attr('rel');
		    $('#ajax-tweet-home').load('/' + $language + '/index/twitterhome');	
		}
		
	}
};


/**
 * Elastislide
 */
$.CORE.elastislide = {
	construct : function () {
		this.execElastislide();
	},
	execElastislide : function () {
		var current = 0,
			$preview = $('#preview'),
			$carouselEl = $('#carousel'),
			$carouselItems = $carouselEl.children(),
			carousel = $carouselEl.elastislide( {
				current : current,
				minItems : 4,
				onClick : function( el, pos, evt ) {

					changeImage( el, pos );
					evt.preventDefault();

				},
				onReady : function() {

					changeImage( $carouselItems.eq( current ), current );

				}
			} );

		function changeImage( el, pos ) {

			$preview.attr( 'src', el.data( 'preview' ) );
			$carouselItems.removeClass( 'current-img' );
			el.addClass( 'current-img' );
			carousel.setCurrent( pos );

		}
		
	}
};

$.CORE.dropdownLinks = {
	construct : function () {
		this.loadFixes();
	},
	loadFixes : function () {
        $('.dropdown-menu a').on('click', function(e){
            window.location.href = $(this).attr('href');
        })
	}
};


/**
 * Triggered from the layout, at the end of the body
 */
$(document).bind('htmlloaded', function () {
	$.CORE.forms.construct();
	$('.external').bind('click', function(e){
		window.open(this.href);
		e.preventDefault();
	});

	// Footer optin
	var show_optin = true;
	if ($('#footer_optin').length) {
		// Open only if cookie false
		if (!Cookies.get('nucleus_hide_optin_blog')) {
			$(document).scroll(function() {
				var y = $(this).scrollTop();
				if (y > 500 && show_optin) {
					$('#footer_optin').fadeIn();
				}
			});
		}

		// Close
		$(document).on('click', '#footer_optin .footer_optin-close', function(e) {
			e.preventDefault();

			$('#footer_optin').fadeOut();
			show_optin = false;

			// Set cookie
			Cookies.set('nucleus_hide_optin_blog', true, { expires: 365 });
		});
	}

	// Forms - Colocation
	$(document).bind('gform_post_render', function(){
		// Optgroups
		var group = null;
		$('.optgroups').find('option').each(function () {
			var strOptGroup = $(this).val().split('-');
			var strOptGroupChk = strOptGroup[0];
			var strOptGroupLabel = strOptGroup[1];
			if (strOptGroupChk == 'GROUP') {
				group = $("<optgroup label='"+ strOptGroupLabel + "' ></optgroup>").insertBefore($(this));
			} else if (strOptGroupChk == 'GROUPEND') {
				group = null;
			}

			if (strOptGroupChk == 'GROUP' || strOptGroupChk == 'GROUPEND') {
				$(this).remove();
				return;
			}

			if (group != null)
				$(this).appendTo(group);

		});

		// Forms - Cloud Hosting
		if ($('#input_12_8, #input_12_9').val() == "Managed" || $('#input_13_8, #input_13_9').val() == "Managed +") {
			// Disable Advanced Firewalling
			$('#choice_12_11_1').prop('disabled', true).prop('checked', true);
		} else {
			// Enable Advanced Firewalling
			$('#choice_12_11_1').prop('disabled', false).prop('checked', false);
		}
		if ($('#input_13_8, #input_13_9').val() == "Managed" || $('#input_13_8, #input_13_9').val() == "Managed +") {
			// Disable Advanced Firewalling
			$('#choice_13_11_1').prop('disabled', true).prop('checked', true);
		} else {
			// Enable Advanced Firewalling
			$('#choice_13_11_1').prop('disabled', false).prop('checked', false);
		}

		// Forms - Cloud Hosting NL
		$(document).on('change', '#input_12_8, #input_12_9', function (){
			var advantage = $(this).val();

			// Find advantages
			switch (advantage) {
				case 'Essentials':
					// Enable Advanced Firewalling
					$('#choice_12_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well:not(#essentials)').hide();
					$('#advantages').show().find('#essentials').show();
					break;
				case 'Essentials +':
					// Enable Advanced Firewalling
					$('#choice_12_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well:not(#essentialsplus)').hide();
					$('#advantages').show().find('#essentialsplus').show();
					break;
				case 'Managed':
					// Disable Advanced Firewalling
					$('#choice_12_11_1').prop('disabled', true).prop('checked', true);

					$('#advantages .well:not(#managed)').hide();
					$('#advantages').show().find('#managed').show();
					break;
				case 'Managed +':
					// Disable Advanced Firewalling
					$('#choice_12_11_1').prop('disabled', true).prop('checked', true);

					$('#advantages .well:not(#managedplus)').hide();
					$('#advantages').show().find('#managedplus').show();
					break;
				case '':
					// Enable Advanced Firewalling
					$('#choice_12_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well').hide();
					$('#advantages').hide();
					break;
			}
		});
		// Forms - Cloud Hosting EN
		$(document).on('change', '#input_13_8, #input_13_9', function (){
			var advantage = $(this).val();

			// Find advantages
			switch (advantage) {
				case 'Essentials':
					// Enable Advanced Firewalling
					$('#choice_13_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well:not(#essentials)').hide();
					$('#advantages').show().find('#essentials').show();
					break;
				case 'Essentials +':
					// Enable Advanced Firewalling
					$('#choice_13_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well:not(#essentialsplus)').hide();
					$('#advantages').show().find('#essentialsplus').show();
					break;
				case 'Managed':
					// Disable Advanced Firewalling
					$('#choice_13_11_1').prop('disabled', true).prop('checked', true);

					$('#advantages .well:not(#managed)').hide();
					$('#advantages').show().find('#managed').show();
					break;
				case 'Managed +':
					// Disable Advanced Firewalling
					$('#choice_13_11_1').prop('disabled', true).prop('checked', true);

					$('#advantages .well:not(#managedplus)').hide();
					$('#advantages').show().find('#managedplus').show();
					break;
				case '':
					// Enable Advanced Firewalling
					$('#choice_13_11_1').prop('disabled', false).prop('checked', false);

					$('#advantages .well').hide();
					$('#advantages').hide();
					break;
			}
		});

		// Forms - Colocation
		$(document).find('#choice_15_37_1, #choice_16_37_1').prop('disabled', true).prop('checked', true);

		// Forms - Dedicated Hosting
		$(document).find('li.gfield.add_description').each(function () {
			var strAppend = $('.gfield_description', this).text();
			$('.ginput_container input', this).after('<span>' + strAppend + '</span>');
		});
	});
});

/**
 * Executes when the DOM has been fully loaded
 */
$(document).ready(function () {
	$.CORE.elastislide.construct();
	$.CORE.twitter.construct();
	$.CORE.mobilemenu.construct();
	$.CORE.carousel.construct();
	$(window).resize(function(){
	    $.CORE.mobilemenu.construct();
	});
	$.CORE.dropdownToggle.construct();
    $.CORE.dropdownLinks.construct();
});

// NUCLEUS EDIT
jQuery('.modal-video').on('show.bs.modal', function (e) {
	var video = jQuery("iframe", this).attr("src");
	jQuery("iframe", this).attr("src","");
	jQuery("iframe", this).attr("src",video);
});
jQuery('.modal-video').on('hide.bs.modal', function (e) {
	if (jQuery(this).find('iframe').length) {
		jQuery(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
	}
});