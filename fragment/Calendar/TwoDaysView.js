sap.ui.define(['sap/m/SinglePlanningCalendarView'], (SinglePlanningCalendarView) => {
	'use strict';

	return SinglePlanningCalendarView.extend('vryndenko.fragment.calenar.TwoDaysView', {
		getEntityCount() {
			return 2;
		},

		getScrollEntityCount() {
			return 2;
		},

		calculateStartDate(oStartDate) {
			return oStartDate;
		}
	});
});
