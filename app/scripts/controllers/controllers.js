'use strict';

/**
 * @ngdoc function
 * @name toyRobotApp.controller: homeController
 */
angular.module('controllers', [])
  .controller('homeController', function ($scope) {
  	$scope.bounds = {
  		max_x: 5,
  		min_x: 0,
  		max_y: 5,
  		min_y: 0
  	};

  	$scope.robot = {
  		position: {},
  		isSet: false
  	};
  	$scope.isCreated = false;
  	$scope.logs = [];
  	$scope.newPosition = {};
  	$scope.angles = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  	$scope.create = function(){
  		if($scope.robot.name === ''){
  			alert('Please enter the name');
  		}else{
	  		$scope.isCreated = true;
	  		$scope.logs.unshift({
	  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
	  			events: 'Robot ' + $scope.robot.name + ' has been created.',
	  			_class: 'normal'
	  		});
	  	}
  	};

  	$scope.place = function(){
  		var now = new Date();

  		//Check if the position is valid
  		if($scope.newPosition.xPos !== undefined && $scope.newPosition.yPos !== undefined && $scope.newPosition.angle !== undefined){
	  		if($scope.checkPosition($scope.newPosition, $scope.bounds)){
		  		$scope.robot.position.xPos = $scope.newPosition.xPos;
		  		$scope.robot.position.yPos = $scope.newPosition.yPos;
		  		$scope.robot.position.angle = $scope.newPosition.angle;
		  		$scope.robot.position.isSet = true;

		  		$scope.logs.unshift({
		  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
		  			events: 'Robot has been placed at (' + $scope.robot.position.xPos + ',' + $scope.robot.position.yPos + '), ' + $scope.robot.position.angle + '.',
		  			_class: 'normal'
		  		});
		  	}else{
		  		alert('Please place the robot in a valid position. It falls down from the table.');
		  		$scope.robot.position.isSet = false;

		  		$scope.logs.unshift({
		  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
		  			events: 'Robot has been placed at (' + $scope.newPosition.xPos + ',' + $scope.newPosition.yPos + '), ' + $scope.newPosition.angle + '. It falls down from the table. Please replace it.',
		  			_class: 'error'
		  		});
		  	}
		  }else{
		  	alert('Please enter x,y values of the position and set its direction.');
		  }
  	};

  	$scope.checkPosition = function(myPosition, bounds){
  		if(myPosition.xPos <= bounds.max_x && myPosition.yPos <= bounds.max_y && myPosition.xPos >=bounds.min_x && myPosition.yPos >= bounds.min_y){
  			return true;
  		}else{
  			return false;
  		}
  	};

  	$scope.rotate = function(direction){
  		if(!$scope.robot.position.isSet){
  			alert('Please place your robot first');
  		}else{
  			var index = $scope.angles.indexOf($scope.robot.position.angle);
  			var new_index = '';
  			switch(direction){
  				case 'left':
  					new_index = (index > 0) ? index - 1 : $scope.angles.length - 1;
  					break;
  				case 'right':
  					new_index = (index < $scope.angles.length - 1) ? index + 1 : 0;
  					break;
  			}

  			$scope.robot.position.angle = $scope.angles[new_index];

  			$scope.logs.unshift({
	  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
	  			events: 'Robot has rotated and turned left. Now it is at (' + $scope.robot.position.xPos + ',' + $scope.robot.position.yPos + '), ' + $scope.robot.position.angle + '.',
	  			_class: 'normal'
	  		});
  		}
  	};

  	$scope.move = function(){
  		if(!$scope.robot.position.isSet){
  			alert('Please place your robot first');
  		}else{
  			$scope.newPosition = $scope.robot.position;

	  		//Update the position based on the current direction
	  		switch($scope.robot.position.angle){
	  			case "EAST":
	  				$scope.newPosition.xPos = parseInt($scope.robot.position.xPos) + 1;
	  				break;
	  			case "SOUTH":
	  				$scope.newPosition.yPos = parseInt($scope.robot.position.yPos) - 1;
	  				break;
	  			case "WEST":
	  				$scope.newPosition.xPos = parseInt($scope.robot.position.xPos) - 1;
	  				break;
	  			case "NORTH":
	  				$scope.newPosition.yPos = parseInt($scope.robot.position.yPos) + 1;
	  				break;
	  		}

	  		if($scope.checkPosition($scope.newPosition, $scope.bounds)){
	  			$scope.robot.position = $scope.newPosition;

		  		$scope.logs.unshift({
		  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
		  			events: 'Robot moved forward. Now it is at (' + $scope.robot.position.xPos + ',' + $scope.robot.position.yPos + '), ' + $scope.robot.position.angle + '.',
		  			_class: 'normal'
		  		});
		  	}else{
		  		$scope.robot.position.isSet = false;
		  		$scope.robot.position = {};
		  		$scope.newPosition = {};

		  		$scope.logs.unshift({
		  			time: moment().format('MM/DD/YYYY h:mm:ss a'),
		  			events: 'Robot falls down from the table. Please replace it.',
		  			_class: 'error'
		  		});
		  	}
	  	}
  	};
  });
