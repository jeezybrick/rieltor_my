/**
 * Created by user on 05.10.15.
 */

angular
    .module('myApp')
    .controller('HomeController', HomeController);

function HomeController($scope, $timeout, AuthUser, Property, MyBookings, Flash, $modal, $location, $mdDialog) {
    $scope.apartments = [
        'Квартира',
        'Комната',
        'Дом'
    ];

    $scope.areas = [
        'Жовтневый',
        'Хортицкий',
        'Орджоникидзевский',
        'Шевченковский'
    ];

    $scope.items = [1,2,3,4];
    $scope.selected = [];

    $scope.menu = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
      };

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
      };
      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };


    $scope.property = Property.query(function (response) {


    }, function () {


    });

    //
    $scope.getSearch = function () {
        $scope.sotrParams = {
            area: $scope.area,
            items: $scope.items,
            start_price: $scope.start_price,
            end_price: $scope.end_price,
            is_image: $scope.is_image,
        };

        $scope.property = Property.query($scope.sotrParams, function (response) {


    }, function () {


    });

    };

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .content($scope.makeOrderModalQuestion)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function () {
            $scope.status = 'You decided to get rid of your debt.';
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

}


angular
    .module('myApp')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $http, $location, $timeout, Flash, AuthUser) {

    $scope.page = '/api/user/';
    $scope.loginProcess = false;
    $scope.title = 'Login';

    $scope.user = AuthUser.query(function (response) {

        if (angular.equals(response.is_auth, false)) {
            //
        } else {
            $location.path('/');
        }

    }, function () {

        $location.path('/');

    });

    // send user's name and mem_id
    $scope.sendLoginData = function () {
        $scope.loginProcess = true;

        $http.post($scope.page, $scope.user).success(function (response) {

            Flash.create('success', response, 'flash-message');
            $scope.delay = $timeout(function () {

                $location.path('/');

            }, 1000);


        }).error(function (error) {

            $scope.sendLoginDataError = error;
            Flash.create('danger', error, 'flash-message');
            $scope.loginProcess = false;
        });
    };


}


angular
    .module('myApp')
    .controller('BookingsController', BookingsController);

function BookingsController($scope, $location, Flash, MyBookings, AuthUser) {

    var date = new Date();
    $scope.isUserAuth = false;
    $scope.currentDate = moment(date).format('MMMM ' + 'YYYY');
    $scope.ordersLoad = false;
    $scope.deleteOrderModalQuestion = "Do you wan't to delete this order?";
    $scope.dateNow = moment(date).format('MMMM YYYY');

    $scope.user = AuthUser.query(function (response) {

        if (angular.equals(response.is_auth, false)) {
            $location.path('/login/');
        }else{
            $scope.isUserAuth = true;
        }

        $scope.bookings = MyBookings.query(function () {

            $scope.ordersLoad = true;

        }, function () {
            $scope.bookingsLoadError = true;
        });


    }, function () {

        $location.path('/');

    });

    //remove order form user's list
    $scope.removeOrder = function (index) {


        MyBookings.delete({id: $scope.bookings[index].id}, function () {

            $scope.bookings.splice(index, 1);

        }, function (error) {

            $scope.defaultError = error.data;
            $scope.detailError = error.data.detail;
            Flash.create('danger', $scope.detailError || $scope.defaultError, 'flash-message');
        });


    };


}

angular
    .module('myApp')
    .controller('AuthController', AuthController);

function AuthController($scope, $location, AuthUser) {

    $scope.title = 'signup';
    $scope.isUserAuth = false;

    $scope.user = AuthUser.query(function (response) {

        if (angular.equals(response.is_auth, false)) {
            $location.path('/login/');
        } else {
            $scope.isUserAuth = true;
        }


    }, function () {

        $location.path('/auth/');

    });

}

angular
    .module('myApp')
    .controller('PageController', PageController);

function PageController($scope) {

    $scope.pageLoad = false;

    angular.element(document).ready(function () {
        $scope.pageLoad = true;
    });

}