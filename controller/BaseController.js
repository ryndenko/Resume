sap.ui.define(
	[
		'sap/ui/core/mvc/Controller',
		'sap/ui/core/UIComponent',
		'sap/ui/Device',
		'sap/m/MessageToast',
		'../util/themeHelper',
		'../util/languageHelper'
	],
	(Controller, UIComponent, Device, MessageToast, themeHelper, languageHelper) => {
		'use strict';

		return Controller.extend('vryndenko.controller.BaseController', {
			// DEFAULT

			getRouter() {
				return UIComponent.getRouterFor(this);
			},

			getModel(sName) {
				return this.getView().getModel(sName);
			},

			setModel(oModel, sName) {
				return this.getView().setModel(oModel, sName);
			},

			i18n(sKey, aParams) {
				const oResourceBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
				return oResourceBundle.getText(sKey, aParams);
			},

			getContentDensityClass() {
				return Device.support.touch ? 'sapUiSizeCozy' : 'sapUiSizeCompact';
			},

			// MENU

			async onPressOpenOverflowMenu(oEvent) {
				const oButton = oEvent.getSource();

				if (!this.oOverflowMenu) {
					this.oOverflowMenu = await this.loadFragment({
						name: 'vryndenko.fragment.OverflowMenu'
					});
				}

				this.oOverflowMenu.openBy(oButton);
			},

			onPressNavigateToPage(sPage) {
				this.getRouter().navTo(sPage);
			},

			onPressSendEmail() {
				const oModel = this.getModel();
				const sEmail = oModel ? oModel.getProperty('/Email') : 'pzromp@gmail.com';
				sap.m.URLHelper.triggerEmail(sEmail, 'Email from ryndenko.site website');
			},

			onPressSetTheme(sKey) {
				themeHelper.setTheme(sKey);
				const sThemeKey = themeHelper.mapTheme(null, sap.ui.core.Configuration.getTheme());
				this.getModel('appView').setProperty('/theme', sThemeKey);
			},

			onPressSetLanguage(sKey) {
				sap.ui.core.Configuration.setLanguage(sKey);
				languageHelper.setLanguage(sKey);
				location.reload(); // need to refresh to change controls language
			},

			async onPressShareLink() {
				const sWebsiteURL = window.location.href;
				const sSuccessMessage = this.i18n('msgSiteUrlCopied', [sWebsiteURL]);
				const sErrorMessage = this.i18n('msgSiteUrlNotCopied');
				this.copyToClipboard(sWebsiteURL, sSuccessMessage, sErrorMessage);
			},

			async copyToClipboard(sValueToCopy, sSuccessMessage, sErrorMessage) {
				try {
					await navigator.clipboard.writeText(sValueToCopy);
					MessageToast.show(sSuccessMessage);
				} catch {
					MessageToast.show(sErrorMessage);
				}
			},

			onPressShowCode() {
				const sWebsiteURL = 'https://github.com/ryndenko/ryndenko.site';
				sap.m.URLHelper.redirect(sWebsiteURL, true);
			},

			// DIALOGS

			isDialogOpen(oDialog, sBinndingPath) {
				if (!oDialog) {
					return false;
				}

				const bSamePath = oDialog.getBindingContext()?.getPath() === sBinndingPath;
				const bOpen = oDialog.isOpen();
				return bOpen && bSamePath;
			}
		});
	}
);
