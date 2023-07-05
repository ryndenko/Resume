sap.ui.define(['sap/m/SinglePlanningCalendarView'], (SinglePlanningCalendarView) => {
	'use strict';

	return SinglePlanningCalendarView.extend('vryndenko.fragment.calenar.ThreesDaysView', {
		getEntityCount() {
			return 3;
		},

		getScrollEntityCount() {
			return 3;
		},

		calculateStartDate(oStartDate) {
			return oStartDate;
		}
	});
});
