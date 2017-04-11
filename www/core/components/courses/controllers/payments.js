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

angular.module('mm.core.courses')

/**
 * Controller to handle the courses list.
 *
 * @module mm.core.courses
 * @ngdoc controller
 * @name mmCoursesListCtrl
 */
.controller('mmPaymentsCtrl', function($scope, $mmCourses, $mmCoursesDelegate, $mmUtil, $mmEvents, $mmSite, $q,
            mmCoursesEventMyCoursesUpdated, mmCoursesEventMyCoursesRefreshed, mmCoreEventSiteUpdated,$http) {

    var updateSiteObserver,
        myCoursesObserver;
    $scope.message="miguel is here";
    $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
    $scope.areNavHandlersLoadedFor = $mmCoursesDelegate.areNavHandlersLoadedFor;
    $scope.filter = {};

    $scope.showOpc= function(value){
					$scope.panel_display=value;
					//alert($scope.panel_display)
				}
				//New bill with fille
				$scope.newBill = function(){
					////console.log($scope.frm_solicitud.documento)
					if($scope.file){
						$scope.contained_progressbar = ngProgressFactory.createInstance();
					  $scope.contained_progressbar.setColor('#58AFE3');
						$scope.contained_progressbar.setParent(document.getElementById('demo_contained'));
						$scope.contained_progressbar.setAbsolute();
						$scope.contained_progressbar.start();
						//	$event.preventDefault();
						var name = $scope.name;
						var file = $scope.file;
						var idPayment_user = $scope.frm_rpayment.course.idPayment_user;
						var idFederal_info = $scope.frm_bill.federal.idFederal_info;
						billService.newBill(file, name,idPayment_user, idFederal_info).then(function(res){
						 		//console.log($scope.frm_solicitud.documento.idRequired_doc)
								if(res.data!='success'){
									 $scope.message="Archivo no válido.";
								}
								if(res.data=='success'){
									$("#file").val('');
									$scope.file = undefined;
									$scope.message="";
							 	}
								$scope.contained_progressbar.complete();
								delete $scope.frm_solicitud.course;
								$scope.uploadedFiles=null;
						});
					}else {
							$scope.message="Debe elegir un documento";
					}
				}
				//get payment list
				$http({
					method: 'JSONP',
					url: 'https://www.cife.edu.mx/admin/Controllers/paymentCtrl.php',
					params: {
						txt_funcion: "getpayments"
					}
				})
				.success(function(data){
					 $scope.payments=data;
				})
				// //get payment list for a specific user
				// $http({
				// 	method: 'POST',
				// 	url: 'https://www.cife.edu.mx/admin/Controllers/paymentCtrl.php',
				// 	data: {
				// 		txt_funcion: "getPaymentsUser"
				// 	}
				// })
				// .success(function(data){
				// 	 $scope.payments_user=data;
				// })
				// //get federal info
				// $http({
				// 	method: 'POST',
				// 	url: 'https://www.cife.edu.mx/admin/Controllers/usersCtrl.php',
				// 	data: {
				// 		txt_funcion: "getFederalInfo"
				// 	}
				// })
				// .success(function(data){
				// 	 $scope.federal=data;
				// 	// //console.log($scope.federal.key)
				// })
				// //get required payments
				// $http({
				// 	method: 'POST',
				// 	url: 'https://www.cife.edu.mx/admin/Controllers/paymentCtrl.php',
				// 	data: {
				// 		txt_funcion: "getRequiredpayments"
				// 	}
				// })
				// .success(function(data){
				// 	 $scope.rpayments=data;
				// 	// //console.log($scope.rpayments)
				// })
				// $http.get("https://www.cife.edu.mx/admin/Controllers/countryCtrl.php")
				//  .success(function(data){
				// 	 $scope.countries = data;
				//  });
				//  //Add federal info
        // ope.AddFederalInfo= function(){
				// 	//alert($scope.frm_bill.federal.idFederal_info)
				// 	$http({
				// 		method: 'POST',
				// 		url: 'https://www.cife.edu.mx/admin/Controllers/usersCtrl.php',
				// 		data: {
				// 			txt_funcion: "AddFederalInfo",
				// 			federal_key:	$scope.frm_bill.federal.key,
				// 			registered_name:	$scope.frm_bill.federal.registered_name,
				// 			country:	$scope.frm_bill.country.idPais,
				// 			state:	$scope.frm_bill.federal.state,
				// 			city:	$scope.frm_bill.federal.city,
				// 			neighborhood:	$scope.frm_bill.federal.neighborhood,
				// 			street:	$scope.frm_bill.federal.street,
				// 			external:	$scope.frm_bill.federal.external,
				// 			internal:	$scope.frm_bill.federal.internal,
				// 			cp:	$scope.frm_bill.federal.cp,
				// 			email:$scope.frm_bill.federal.email
				// 		}
				// 	})
				// 	.success(function(data){
				// 		 $scope.rpayments=data;
				// 		// //console.log($scope.rpayments)
				// 	})
				// 	alert("Tu datos de facturación han sido agregados.")
				// 	$scope.frm_payment=undefined;
				// }
				//  //update federal info
        // ope.UpdateFederalInfo= function(){
				// 	//alert($scope.frm_bill.federal.idFederal_info)
				// 	$http({
				// 		method: 'POST',
				// 		url: 'https://www.cife.edu.mx/admin/Controllers/usersCtrl.php',
				// 		data: {
				// 			txt_funcion: "UpdateFederalInfo",
				// 			idFederal_info:$scope.frm_bill.federal.idFederal_info,
				// 			federal_key:	$scope.frm_bill.federal.key,
				// 			registered_name:	$scope.frm_bill.federal.registered_name,
				// 			country:	$scope.frm_bill.country.idPais,
				// 			state:	$scope.frm_bill.federal.state,
				// 			city:	$scope.frm_bill.federal.city,
				// 			neighborhood:	$scope.frm_bill.federal.neighborhood,
				// 			street:	$scope.frm_bill.federal.street,
				// 			external:	$scope.frm_bill.federal.external,
				// 			internal:	$scope.frm_bill.federal.internal,
				// 			cp:	$scope.frm_bill.federal.cp,
				// 			email:$scope.frm_bill.federal.email
				// 		}
				// 	})
				// 	.success(function(data){
				// 		 $scope.rpayments=data;
				// 		// //console.log($scope.rpayments)
				// 	})
				// 	alert("Tu datos de facturación han sido actualizados.")
				// 	$scope.frm_payment=undefined;
				// }
				//  //GENERAR REPORTE
        // ope.GenerateReport = function (payment_info){
				// 	//console.log(payment_info);
				// 	var fileName = "ficha.pdf";
			  //   var a = document.createElement("a");
        // alert("Espere en lo que se genera el pdf");
        // ttp.post("https://www.cife.edu.mx/admin/Controllers/paymentCtrl.php",{
				//  			txt_funcion: 'GenerateBankReport',
				// 			cname: payment_info.name,
				// 			amountmx: payment_info.amountmx,
				// 			bankname:payment_info.bankname
        // ,
        // responseType: 'arraybuffer'}
        //
        // uccess(function(data){
        // ar file = new Blob([data], {type: 'application/pdf'});
        // ar fileURL = URL.createObjectURL(file);
			 	// 		  a.href = fileURL;
			  //              a.download = fileName;
			  //              a.click();
			 	// 		  //$window.open(fileURL,"Planeacion_didactica");
        //
        // rror(function(err){
        // ;
        //
				// //Generate payment
				// $scope.generatePayment= function(){
				// 	$http({
				// 		method: 'POST',
				// 		url: 'https://www.cife.edu.mx/admin/Controllers/paymentCtrl.php',
				// 		data: {
				// 			txt_funcion: "newPaymentToUser",
				// 			idPayment:	$scope.frm_payment.course.idPayment
				// 		}
				// 	})
				// 	.success(function(data){
				// 		 $scope.rpayments=data;
				// 		// //console.log($scope.rpayments)
				// 	})
				// 	alert("Your payment has been generated")
				// 	$scope.frm_payment=undefined;
				// 	$window.location.reload();
        //
				// }

    myCoursesObserver = $mmEvents.on(mmCoursesEventMyCoursesUpdated, function(siteid) {
        if (siteid == $mmSite.getId()) {
            fetchCourses();
        }
    });


    updateSiteObserver = $mmEvents.on(mmCoreEventSiteUpdated, function(siteId) {
        if ($mmSite.getId() === siteId) {
            $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
        }
    });

    $scope.$on('$destroy', function() {
        myCoursesObserver && myCoursesObserver.off && myCoursesObserver.off();
        updateSiteObserver && updateSiteObserver.off && updateSiteObserver.off();
    });
});
