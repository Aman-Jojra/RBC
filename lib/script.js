// Add your code here

(function () {
  'use strict';

  angular
    .module('MyApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'material.svgAssetsCache'])
    .controller('AppCtrl', ['$scope', '$mdDialog', '$location', AppCtrl])
    .config(['$routeProvider', routeSetup])
    .controller('DashboardCtrl', ['$mdDialog', DashboardCtrl]);

  function AppCtrl($scope, $mdDialog, $location) {
    $scope.data = {
      selectedIndex: 0,
      secondLocked: true,
      secondLabel: "Item Two",
      bottom: false,
      tabs: [{
        label: 'All',
        id: 0
      }]
    };
    
    $scope.userFormData = $scope.userFormData || { incidentNumber: Math.floor(Math.random() * 1000000000) };

    $scope.selectedTab = $scope.selectedTab || {};
    $scope.dataSource = {
      divisions: ['RBC Banking', 'RBC Retail', 'RBC Automotive', 'RBC Industries'],
      states: ['Alberta', 'British', 'Columbia', 'Manitoba', 'New Brunswick', 
              'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 
              'Quebec', 'Saskatchewan'],
      countries: ['Canada', 'United States', 'UK'],
      entities: ['Bank', 'School', 'Shop'],
      transactionFors: ['Personal: Any transaction for another individual', 'Group: Any transaction for group'],
      currencies: ['AUD','CAD','EUR', 'GBP', 'USD'],
      methodsOfTransactions: ['Armoured car', 'Camorod car', 'Decred car'],
      clientTypes: ['RBC Client', 'External Client', 'Internal Client'],
      identifiers: ['Driving License', 'Passport', 'Rental Lease', 'Phone Bill'],
      dispositions: ['Deposit', 'Debit', 'Transfer'],
      typesOfAccount: ['Debit', 'Credit'],
      typesOfCurrencies: ['Direct', 'Indirect'],
      typesOfTransactions: ['Transaction 1', 'Transaction 2', 'Transaction 3']
    }
    $scope.templateMap = {
      0: 'template.html',
      1: 'part-a.html',
      2: 'part-b.html',
      3: 'part-c.html',
      4: 'part-d.html',
      5: 'part-e.html',
      6: 'part-f.html',
      8: 'part-g.html',
      7: 'part-h.html'
    }
    let labelValueMap = {
      0: {
        'transit':  'Transit #',
        'account': 'account'
      },
      1: {
        'divison': 'RBC Employee Division',
        'lastName': 'Last Name',
        'firstName': 'First Name',
        'initials': 'Initials',
        'phone': 'Phone number',
        'streetAddress': 'Street Address',
        'city': 'City',
        'state': 'Province or State',
        'country': 'Country',
        'postalCode': 'Postal Code',
        'employedID': 'Employee ID number',
        'branchNumber': 'Branch or Transit number',
        'entity': 'Type of reporting entity'
      }, 
      2: {
        'transactionFor': 'Is this transaction for',
        'dateOfTransaction': 'Date of Transaction',
        'timeOfTransaction': 'Time of Transaction',
        'nightDepositIndicator': 'Night Deposit/QuickDrop-Fasdeposit Indicator',
        'otherDateOfTransaction': 'Date if other than date of transaction',
        'amountOfTransaction': 'Amount of Transaction',
        'sourceOfFunds': 'Source of Funds',
        'currency': 'Currency',
        'methodOfTransaction': 'Method of Transaction conducted'
      },
      3: {
        'surName': 'Surname',
        'givenName': 'Given Name',
        'clientType': 'Client Type',
        'rbcSRFNo': 'RBC SRF Number',
        'cStreetAddress': 'Street Address',
        'cCity': 'City',
        'cState': 'Province or State',
        'cCountry': 'Country',
        'cPostalCode': 'Postal Code or Zip code',
        'homePhoneNumber': 'Home Phone number',
        'identifier': 'Individual Identifier',
        'idNumber': 'ID Number of individual identifier',
        'placeOfIssue': 'Place of issue - Applicable'
      },
      4: {
        'trustName': 'Business, Corporation or Trust name',
        'accountManager': 'Account Manager',
        'dClientType': 'Client Type',
        'typeOfBusiness': 'Type of business',
        'sicCode': 'SIC Code',
        'bscCode': 'BSC Code ',
        'dStreetAddress': 'Street Address',
        'dCity': 'City',
        'dState': 'Province or State',
        'dCountry': 'Country',
        'dPostalCode': 'Postal Code or Zip code',
        'dHomePhoneNumber': 'Home Phone number',
        'incorporationNo': 'Incorporation number',
        'stateOfIncorporation': 'Province or State of Incorporation',
        'countryOfIncorporation': 'ountry of Incorporation'
      },
      5: {
        'eSurName': 'Surname',
        'eGivenName': 'Given Name',
        'eInitials': 'Initials',
        'eclientType': 'Client Type',
        'eStreetAddress': 'Street Address',
        'eCity': 'City',
        'eState': 'Province or State',
        'eCountry': 'Country',
        'ePostalCode': 'Postal Code or Zip code',
        'ehomePhoneNumber': 'Home Phone number',
        'eOfficePhoneNumber': 'Office Phone number',
        'eExtn': 'Ext',
        'eIdentifier': 'Individual Identifier',
        'eIDNumber': 'ID Number of individual identifier',
        'placeOfIssue': 'Place of issue - Applicable'
      },
      6: {
        'disposition': 'Disposition of funds',
        'amountOfDisposition': 'Amount of Disposition',
        'fCurrency': 'Currency',
        'beneficiaryDetails': 'Beneficiary Bank/Payee Name/Serial Number',
        'beneficiaryaccount': 'Beneficiary Bank/Payee Account Number'
      },
      8: {
        'branchTNumber': 'Branch or Transit number',
        'accountNumber': 'Account Number',
        'typesOfAccount': 'Type of Account',
        'typeOfCurrency': 'Type of Currency',
        'accountHolderA': 'Full name of each account holder: A',
        'accountHolderB': 'Full name of each account holder: B',
        'accountHolderC': 'Full name of each account holder: C'
      },
      7: {
        'placeOfIssue': 'Place of Issue'
      }
    }

    $scope.editIncident = function() {
      var selected = $scope.collection.find(c => c.checked);
      $location.path( "/details" );
      $scope.userFormData = $scope.collection.find(c => c.incidentNumber === selected.incidentNumber);

      $scope.data.tabs = Object.keys($scope.templateMap).map(k => {
        return {
          label: `${$scope.templateMap[k].replace('.html', '')}`,
          id: k,
          disableLink: true
        }
      })
    }

    $scope.triggered = function(item) {
      var state = angular.copy(item);
      $scope.collection.forEach(c => c.checked = false);
      item.checked = state.checked;
    }

    $scope.collection = [];
    $scope.next = function () {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function () {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    $scope.tabSelect = function (tab) {

      $scope.data.selectedIndex = tab.id;
      if (!tab.disableLink) {
        $scope.previousTab = tab;
        $scope.showModal();
      }
      setupGrid();
    }

    function setupGrid() {
      let id = $scope.data.selectedIndex;
      $scope.data.grid = Object.keys(labelValueMap[id]).map(k => ({label: labelValueMap[id][k], value: $scope.userFormData[k]}));
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.save = function () {
      if ($scope.editTab) {
        setupGrid();
        $scope.editTab = false;
      } else {
        let id = Math.max.apply(null, $scope.data.tabs.map(t => t.id)) + 1;
        if($scope.templateMap[id]){
          $scope.data.tabs.push({
            label: `${$scope.templateMap[id].replace('.html', '')}`,
            id: id
          });
        }
        if(id === 9){
          var existing = $scope.collection.find(c => c.incidentNumber === $scope.userFormData.incidentNumber);
          if(existing){
            existing.data = $scope.userFormData;
          } else {
            $scope.collection.push({
              incidentNumber: $scope.userFormData.incidentNumber,
              data: $scope.userFormData
            });
          }
          $location.path("/dashboard");
          $scope.userFormData = {incidentNumber: Math.floor(Math.random() * 1000000000)};
          $scope.data.tabs = [{
            label: 'All',
            id: 0
          }];
        } else {
          setupGrid();
          $scope.previousTab.disableLink = true;
        }
        
      }

      $mdDialog.hide();
    };

    $scope.gotoLink = function(link){
      $location.path( "/" + link );
    }

    $scope.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };

    $scope.edit = function (id) {
      //$scope.data.selectedIndex = id;
      $scope.editTab = true;
      $scope.showModal(null);
    }
    $scope.showModal = function (ev) {
      $mdDialog.show({
          contentElement: '#myStaticDialog',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (user) {
          $scope.status = 'You saved the dialog.';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  }

  function routeSetup($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl : "./templates/dashboard.html"
      })
      .when("/dashboard", {
          templateUrl : "./templates/dashboard.html"
      })
      .when("/details", {
          templateUrl : "./templates/details.html"
      });
  }

  function DashboardCtrl($mdDialog) {

  };

})();


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at https://material.angularjs.org/license.
**/