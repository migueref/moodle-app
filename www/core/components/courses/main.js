// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.courses', ['mm.core.contentlinks'])

.constant('mmCoursesSearchComponent', 'mmCoursesSearch')
.constant('mmCoursesSearchPerPage', 20) // Max of courses per page when searching courses.
.constant('mmCoursesEnrolInvalidKey', 'mmCoursesEnrolInvalidKey')
.constant('mmCoursesEventMyCoursesUpdated', 'my_courses_updated')
.constant('mmCoursesEventMyCoursesRefreshed', 'my_courses_refreshed') // User refreshed My Courses.
.constant('mmCoursesAccessMethods', {
     guest: 'guest',
     default: 'default'
})

.config(function($stateProvider) {

    $stateProvider

    .state('site.mm_courses', {
        url: '/mm_courses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/list.html',
                controller: 'mmCoursesListCtrl'
            }
        }
    })
    .state('site.payments', {
        url: '/mm_payments',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/payments.html',
                controller: 'mmPaymentsCtrl'
            }
        }
    })
    .state('site.bills', {
        url: '/mm_bills',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/bills.html',
                controller: 'mmPaymentsCtrl'
            }
        }
    })
    .state('site.desertion', {
        url: '/mm_desertion',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/desertion.html',
                controller: 'mmDesertionCtrl'
            }
        }
    })
    .state('site.forums', {
        url: '/mm_forums',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/forums.html',
                controller: 'mmForumsCtrl'
            }
        }
    })
    .state('site.groups', {
        url: '/mm_groups',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/groups.html',
                controller: 'mmGroupsCtrl'
            }
        }
    })
    .state('site.assignment', {
        url: '/mm_assignment',
        params: {
            course: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/assignment.html',
                controller: 'mmAssignmentsCtrl'
            }
        }
    })
    .state('site.assignments', {
        url: '/mm_assignments',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/assignments.html',
                controller: 'mmAssignmentsCtrl'
            }
        }
    })
    .state('site.feedback', {
        url: '/mm_feedback',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/feedback.html',
                controller: 'mmAssignmentsCtrl'
            }
        }
    })

    .state('site.mm_searchcourses', {
        url: '/mm_searchcourses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/search.html',
                controller: 'mmCoursesSearchCtrl'
            }
        }
    })

    .state('site.mm_viewresult', {
        url: '/mm_viewresult',
        params: {
            course: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/viewresult.html',
                controller: 'mmCoursesViewResultCtrl'
            }
        }
    })

    .state('site.mm_coursescategories', {
        url: '/mm_coursescategories',
        params: {
            categoryid: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/coursecategories.html',
                controller: 'mmCourseCategoriesCtrl'
            }
        }
    })

    .state('site.mm_availablecourses', {
        url: '/mm_availablecourses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/availablecourses.html',
                controller: 'mmCoursesAvailableCtrl'
            }
        }
    });

})

.config(function($mmContentLinksDelegateProvider) {
    $mmContentLinksDelegateProvider.registerLinkHandler('mmCourses:courses', '$mmCoursesHandlers.coursesLinksHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmCourses:course', '$mmCoursesHandlers.courseLinksHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmCourses:dashboard', '$mmCoursesHandlers.dashboardLinksHandler');
})

.run(function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, mmCoreEventLogout, $mmCoursesDelegate, $mmCourses,
            mmCoreEventRemoteAddonsLoaded) {
    $mmEvents.on(mmCoreEventLogin, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventRemoteAddonsLoaded, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventLogout, function() {
        $mmCoursesDelegate.clearCoursesHandlers();
        $mmCourses.clearCurrentCourses();
    });
});
