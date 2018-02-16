import $ from 'jquery';

if ($(window).width() >= 1200) {
    desktopMegaMenuFunctionality();
} else if ($(window).width() < 1200) {
    mobileMegaMenuFunctionality();
}

$(window).on('resize', function(){
    $('.navPages-list .navPages-item.has-child-menu').unbind();
    if ($(window).width() >= 1200) {
        desktopMegaMenuFunctionality();
    } else if ($(window).width() < 1200) {
        mobileMegaMenuFunctionality();
    }
})

function desktopMegaMenuFunctionality() {
    // These are the first level menu links on the top level header
    const firstLevelMenuLinksClass = '.navPages-list .navPages-item.has-child-menu';

    // This is the class representing the mega-menu dropdown container
    const megaMenuClass = '.dropdown.dropdown--megaMenu';


    $(firstLevelMenuLinksClass).on('click', function(e) {
        e.preventDefault();


        let hoveredLink = $(e.currentTarget);
        let megaMenu = hoveredLink.closest('.header').find(megaMenuClass);

        if (hoveredLink.hasClass('hovered')) {
            let el = $(megaMenuClass);

            el.removeClass('is-open');
            el.html('');

            // Remove 'hovered' class on the link that was hovered in order to open this mega menu
            // Removing this class essentially hides the arrow below the link.
            el.closest('.header').find(`${firstLevelMenuLinksClass}.hovered`).removeClass('hovered');
        } else {

            if (hoveredLink.hasClass('has-child-menu')) {
                let html = $(e.currentTarget).find('.second-level').html();
                let activeDropdown = $('.dropdown:not(.dropdown-megaMenu).is-open');

                activeDropdown.removeClass('is-open');

                megaMenu.addClass('is-open');
                megaMenu.html(html);

                $(`${firstLevelMenuLinksClass}.hovered`).removeClass('hovered');
                $(e.currentTarget).addClass('hovered');
            } else {
                $(`${firstLevelMenuLinksClass}.hovered`).removeClass('hovered');
                megaMenu.removeClass('is-open');
                megaMenu.html('');
            }
            
        }

    });

    /**
    $(document).on('mouseenter', megaMenuClass, e => {
        e.preventDefault();

        $(e.currentTarget).addClass('is-open');
    });
    **/

    $('.navPages-list .navPages-item.hovered').on('click', function(e) {
        e.preventDefault();

        console.log("clicked hovered");
        let el = $(megaMenuClass);

        el.removeClass('is-open');
        el.html('');

        // Remove 'hovered' class on the link that was hovered in order to open this mega menu
        // Removing this class essentially hides the arrow below the link.
        el.closest('.header').find(`${firstLevelMenuLinksClass}.hovered`).removeClass('hovered');
    });
}

function mobileMegaMenuFunctionality() {
    $('.navPages-item > .navPages-action > .fa').on('touchstart click', e => {
        e.preventDefault();

        let el = $(e.currentTarget);

        el.hide();

        if (el.hasClass('fa-angle-up')) {
            el.parent().find('.fa-angle-down').show();
            el.parent().next('.second-level').slideUp();
        } else {
            el.parent().find('.fa-angle-up').show();
            el.parent().next('.second-level').slideDown();
        }
    });
}
