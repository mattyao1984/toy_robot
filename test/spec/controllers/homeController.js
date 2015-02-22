'use strict';

describe('Controller: homeController', function () {

  // load the controller's module
  beforeEach(module('toyRobotApp'));

  var homeController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    homeController = $controller('homeController', {
      $scope: scope
    });
  }));

  describe('Initialize values', function() {
    it('should init robot with correct values', function () {
      expect(scope.robot.isSet).toBe(false);
      expect(scope.isCreated).toBe(false);
      expect(scope.logs.length).toBe(0);
      expect(scope.bounds.max_x).toBe(5);
      expect(scope.bounds.max_y).toBe(5);
      expect(scope.bounds.min_x).toBe(0);
      expect(scope.bounds.min_y).toBe(0);
      expect(scope.angles.length).toBe(4);
    });
  });

  describe('Create robot name', function() {
    it('Should check valid name', function () {
      scope.robot.name = 'Matt Yao';
      scope.create();
      expect(scope.isCreated).toBe(true);
    });

    it('Should check valid name', function () {
      scope.robot.name = '';
      scope.create();
      expect(scope.isCreated).toBe(false);
    });
  });

  describe('Place robot', function() {
    it('should enter the positions X first', function () {
      scope.newPosition.x_pos = undefined;
      scope.place();
      expect(scope.robot.isSet).toBe(false);
    });

    it('should enter the positions Y first', function () {
      scope.newPosition.y_pos = undefined;
      scope.place();
      expect(scope.robot.isSet).toBe(false);
    });

    it('should enter the positions angle first', function () {
      scope.newPosition.angle = undefined;
      scope.place();
      expect(scope.robot.isSet).toBe(false);
    });

    it('should put the robot within the bounds', function () {
      scope.newPosition.x_pos = 3;
      scope.newPosition.y_pos = 12;
      scope.newPosition.angle = 'NORTH';
      scope.place();
      expect(scope.robot.isSet).toBe(false);

      scope.newPosition.x_pos = 2;
      scope.newPosition.y_pos = -1;
      scope.newPosition.angle = 'EAST';
      scope.place();
      expect(scope.robot.isSet).toBe(false);

      scope.newPosition.x_pos = 10;
      scope.newPosition.y_pos = 3;
      scope.newPosition.angle = 'SOUTH';
      scope.place();
      expect(scope.robot.isSet).toBe(false);

      scope.newPosition.x_pos = -2;
      scope.newPosition.y_pos = 3;
      scope.newPosition.angle = 'WEST';
      scope.place();
      expect(scope.robot.isSet).toBe(false);

      scope.newPosition.x_pos = 1;
      scope.newPosition.y_pos = 2;
      scope.newPosition.angle = 'NORTH';
      scope.place();
      expect(scope.robot.isSet).toBe(true);
    });
  });

  describe('Rotate robot', function() {
     it('Should ignore rotate action without placing the robot first', function () {
      scope.rotate('left');
      expect(scope.robot.position.angle).toBe(undefined);
    });

    it('Should face NORTH if turn left from EAST, and stay at the same position', function () {
      scope.robot.position = {
        x_pos: 2,
        y_pos: 3,
        angle: 'EAST'
      };
      scope.robot.isSet = true;

      scope.rotate('left');
      expect(scope.robot.position.x_pos).toBe(2);
      expect(scope.robot.position.y_pos).toBe(3);
      expect(scope.robot.position.angle).toBe('NORTH');
    });

    it('Should face SOUTH if turn right from EAST, and stay at the same position', function () {
      scope.robot.position = {
        x_pos: 4,
        y_pos: 5,
        angle: 'EAST'
      };
      scope.robot.isSet = true;

      scope.rotate('right');
      expect(scope.robot.position.x_pos).toBe(4);
      expect(scope.robot.position.y_pos).toBe(5);
      expect(scope.robot.position.angle).toBe('SOUTH');
    });
  });

  describe('Move robot', function() {
     it('Should ignore move action without placing the robot first', function () {
      scope.move();
      expect(scope.robot.position.x_pos).toBe(undefined);
      expect(scope.robot.position.y_pos).toBe(undefined);
      expect(scope.robot.position.angle).toBe(undefined);
    });

    it('Should move to 2,1 and stay facing EAST', function () {
      scope.robot.position = {
        x_pos: 1,
        y_pos: 1,
        angle: 'EAST'
      };
      scope.robot.isSet = true;

      scope.move();
      expect(scope.robot.position.x_pos).toBe(2);
      expect(scope.robot.position.y_pos).toBe(1);
      expect(scope.robot.position.angle).toBe('EAST');
    });

    it('Should move to 3,5 and stay facing NORTH', function () {
      scope.robot.position = {
        x_pos: 3,
        y_pos: 4,
        angle: 'NORTH'
      };
      scope.robot.isSet = true;

      scope.move();
      expect(scope.robot.position.x_pos).toBe(3);
      expect(scope.robot.position.y_pos).toBe(5);
      expect(scope.robot.position.angle).toBe('NORTH');
    });

    it('Should fall from the table', function () {
      scope.robot.position = {
        x_pos: 0,
        y_pos: 2,
        angle: 'WEST'
      };
      scope.robot.isSet = true;

      scope.move();
      expect(scope.robot.position.x_pos).toBe(undefined);
      expect(scope.robot.position.y_pos).toBe(undefined);
      expect(scope.robot.position.angle).toBe(undefined);
    });
  });
});
