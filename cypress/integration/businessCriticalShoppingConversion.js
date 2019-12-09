const url = 'https://m.aboutyou.de';
const burgerIcon = '[data-cy-id=BurgerIcon]';
const loginButton = '.Offcanvas__LoginButton-lf7oqa-6';
const inputEmail = 'input[name=email]';
const inputPassword = 'input[name=password]';
const loginIframe = '.Account__StyledIframe-pnr7km-1';
const username = 'mattnoerr@gmail.com';
const password = 'zSnxnN7V&9bj';
const aboutYouLogo = '[data-cy-id=HeaderAYLogo]';
const productImageTile = '.CdnImage__StyledImg-upef3-0';
const sizeSeletionItem = 'p.SizeSelectionItem__Label-n72uim-0';
const searchButton = '[data-cy-id=HeaderSearchIcon]';
const wishListButton = '[data-cy-id=HeaderWishlistIcon]';
const shoppingBasket = '[data-cy-id=HeaderBasketIcon]';
const quickSizeSelectLabel = 'div.QuickSizeSelect__Label-sc-1codpzh-3';
const quickSizeItem = 'div.QuickSizeSelect__SizeItem-sc-1codpzh-4';


describe ('Business critical shopping conversion', () => {
    before( ()  => {
        cy.visit(url);
        cy.url().should('include', url);
        cy.get(aboutYouLogo).should('be.visible');
        cy.get(searchButton).should('be.visible');
        cy.get(wishListButton).should('be.visible');
        cy.get(shoppingBasket).should('be.visible');
    });

    it('Logs into the user account', () => {
        cy.get(burgerIcon).should('be.visible').click();
        cy.url().should('include', url + '/category-overview');
        cy.get(loginButton).click();

        // Type in username
        cy.get(loginIframe, { timeout: 5000 }).should(($iframe) => {
            expect($iframe.contents().find(inputEmail)).to.exist
        })
            .then(($iframe) => {
                return cy.wrap($iframe.contents().find(inputEmail))
            }).type(username);

        // Type in password
        cy.get(loginIframe, { timeout: 5000 }).should(($iframe) => {
            expect($iframe.contents().find(inputPassword)).to.exist
        })
            .then(($iframe) => {
                return cy.wrap($iframe.contents().find(inputPassword))
            }).type(password);

        // Click login button
        cy.get(loginIframe, { timeout: 5000 }).should(($iframe) => {
            expect($iframe.contents().find('button[type=submit]')).to.exist
        })
            .then(($iframe) => {
                return cy.wrap($iframe.contents().find('button[type=submit]'))
            }).click();

        cy.get(aboutYouLogo).click();
    });

    it('Categories are visible', () => {
        cy.get('a').contains('Frauen').should('be.visible');
        cy.get('a').contains('Männer').should('be.visible');
        cy.get('a').contains('Kinder').should('be.visible');
        cy.get('[data-cy-id=bekleidung]').should('be.visible').and('to.have.text', 'Bekleidung');
        cy.get('[data-cy-id=schuhe]').should('be.visible').and('to.have.text', 'Schuhe');
        cy.get('[data-cy-id=accessoires]').should('be.visible').and('to.have.text', 'Accessoires');
        cy.get('[data-cy-id=premium]').should('be.visible').and('to.have.text', 'Premium');
        cy.get('[data-cy-id=sport]').should('be.visible').and('to.have.text', 'Sport');
        cy.get('[data-cy-id=sale]').should('be.visible').and('to.have.text', 'SALE');
    });

    it('Selects a product and navigates to check out', () => {
        cy.get('a').contains('Männer').click();
        cy.get('[data-cy-id=bekleidung]').click();
        cy.url().should('include', '/maenner/bekleidung');
        cy.get('p').contains('Jacken').click();
        cy.url().should('include', '/jacken');
        cy.get(quickSizeSelectLabel).should('be.visible').and('to.have.text', 'Größe');
        cy.get(quickSizeItem).eq(3).should('be.visible').and('to.have.text', 'M');
        // Click first product.
        cy.get(productImageTile).should('be.visible').first().click();
        // data-cy-id="size_M" is not found, class is used instead
        cy.get(sizeSeletionItem).contains('M').should('be.visible').click();
        // [data-cy-id="AddToBasketButton] is not found, button text is used instead
        cy.get('p').contains('In den Warenkorb').should('be.visible').click();
        cy.get(shoppingBasket).should('be.visible').click();
        cy.url().should('include', '/warenkorb');
        cy.get('button').contains('Jetzt sicher zur Kasse').should('be.visible');
    });
});
