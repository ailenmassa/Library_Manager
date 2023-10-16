"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var node_crypto_1 = require("node:crypto");
var User = /** @class */ (function () {
    function User(nombre, address, phoneNumber) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.scoring = 0;
        this.isPenalized = false;
        this.dateOfPenalized = new Date;
        this.nombre = nombre;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setName = function (nombre) {
        this.nombre = nombre;
    };
    User.prototype.getName = function () {
        return this.nombre;
    };
    User.prototype.setAddress = function (address) {
        this.address = address;
    };
    User.prototype.getAddress = function () {
        return this.address;
    };
    User.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    User.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    User.prototype.getScoring = function () {
        return this.scoring;
    };
    ;
    User.prototype.increaseScoring = function (points) {
        return this.scoring += points;
    };
    ;
    User.prototype.decreaseScoring = function (points) {
        return this.scoring -= points;
    };
    ;
    User.prototype.changeToPenalized = function () {
        if (this.scoring > 5)
            this.isPenalized = true;
    };
    ;
    User.prototype.getPenalized = function () {
        return this.isPenalized;
    };
    return User;
}());
exports.User = User;
