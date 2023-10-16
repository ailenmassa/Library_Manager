"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var user_1 = require("./user");
var loans_1 = require("./loans");
var book_1 = require("./book");
var magazine_1 = require("./magazine");
var Library = /** @class */ (function () {
    function Library() {
        ;
        this.items = [];
        this.users = [];
        this.loans = [];
    }
    Library.prototype.addLibraryItem = function (items) {
        this.items.push(items);
        console.log("Item registred\n");
    };
    Library.prototype.addUser = function (user) {
        this.users.push(user);
        console.log("User registred\n");
    };
    Library.prototype.editLibraryItem = function (indice, newItemChanged) {
        if (indice >= 0 && indice < this.items.length) {
            this.items[indice] = newItemChanged;
        }
        else {
            console.log("El índice está fuera de los límites del array.\n");
        }
    };
    Library.prototype.editUser = function (indice, newUserChanged) {
        if (indice >= 0 && indice < this.users.length) {
            this.users[indice] = newUserChanged;
        }
        else {
            console.log("El índice está fuera de los límites del array.\n");
        }
    };
    Library.prototype.deleteUser = function (array, indice) {
        if (indice >= 0) {
            this.users.splice(indice, 1);
            console.log("User deleted.\n");
        }
        else {
            console.log("El índice está fuera de rango.\n");
        }
    };
    Library.prototype.deleteLibraryItem = function (array, indice) {
        if (indice >= 0) {
            this.items.splice(indice, 1);
            console.log("Item deleted.\n");
        }
        else {
            console.log("El índice está fuera de rango.\n");
        }
    };
    Library.prototype.getArrayUsers = function (arrayToShow) {
        console.log("Array content is:\n");
        this.users.forEach(function (item) {
            console.log(item);
        });
    };
    Library.prototype.getArrayItems = function (arrayToShow) {
        console.log("Array content is:\n");
        this.items.forEach(function (item) {
            console.log(item);
        });
    };
    Library.prototype.loanItem = function (item, user) {
        var isPenalized = user.getPenalized();
        if (isPenalized = true) {
            console.log("Error, user is penalized.");
            return;
        }
        if (!this.isUserValid(user)) {
            console.log("User not found\n");
            return;
        }
        var existingItem = this.findItem(item);
        if (!existingItem || !existingItem.isItemAvailable()) {
            console.log("Item not available.\n");
            return;
        }
        existingItem.markAsUnavailable();
        var loan = new loans_1.Loan(existingItem, user);
        this.loans.push(loan);
        console.log("".concat(user.getName(), " retira \"").concat(item.getTitle(), "\" el dia ").concat(loan.getLoanDate().toLocaleDateString(), " con fecha de devoluci\u00F3n ").concat(loan
            .getDueDate()
            .toLocaleDateString(), "\n"));
    };
    Library.prototype.returnItem = function (item, user, returnDate) {
        var loan = this.findActiveLoan(item, user);
        if (!loan) {
            console.log("Préstamo no registrado. Revise Título y Usuario\n");
            return;
        }
        var existingItem = this.findItem(item);
        if (existingItem) {
            existingItem.markAsAvailable();
        }
        var dueDate = loan.getDueDate();
        if (returnDate > dueDate) {
            var lateDays = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
            switch (true) {
                case (lateDays <= 7):
                    user.increaseScoring(2);
                    console.log("El usuario ".concat(user.getName(), " devolvio el libro tarde, se le sumaran 2 puntos."));
                    user.changeToPenalized();
                    break;
                case (lateDays >= 8 && lateDays <= 14):
                    user.increaseScoring(5);
                    console.log("El usuario ".concat(user.getName(), " devolvio el libro tarde, se le sumaran 5 puntos."));
                    user.changeToPenalized();
                    break;
                default:
                    console.log("El usuario ".concat(user.getName(), " excedio el maximo tiempo de espera, su cuenta se penalizara ."));
                    break;
            }
            ;
        }
        else {
            if (returnDate < dueDate)
                console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\" a tiempo. Se le descontara un punto.\n"));
            if (user.getScoring() > 0) {
                user.decreaseScoring(1);
            }
            ;
            this.loans = this.loans.filter(function (l) { return l !== loan; });
            console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\" el dia ").concat(returnDate.toLocaleDateString(), " \n\""));
        }
    };
    Library.prototype.findActiveLoan = function (item, user) {
        return this.loans.find(function (loan) { return loan.getItem() === item && loan.getUser() === user; });
    };
    Library.prototype.isUserValid = function (user) {
        return this.users.includes(user);
    };
    Library.prototype.findItem = function (item) {
        return this.items.find(function (i) { return i === item; });
    };
    return Library;
}());
exports.Library = Library;
// ---------------------------------------------------------------------------------------
console.log("_____________create and register items_____________");
var library = new Library();
var book01 = new book_1.Book("A sangre fría", 1977, "Rodolfo Walsh");
var book02 = new book_1.Book("Harry Potter", 1999, " J. K. Rowling,");
var magazine01 = new magazine_1.Magazine("Pronto", 2011, "Random House Penguin sarasa");
var magazine02 = new magazine_1.Magazine("-------", 2000, "------------");
library.addLibraryItem(book01);
library.addLibraryItem(book02);
library.addLibraryItem(magazine01);
library.addLibraryItem(magazine02);
console.log("_____________create and register users_____________");
var user01 = new user_1.User("Marcelo Bettini", { street: "Humberto Primo", number: 602, apartment: "1C" }, "123-444-555");
var user02 = new user_1.User("Sergio Fino", {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B",
}, "555-555-555");
var user03 = new user_1.User("Ailen Massa", { street: "xxxxxx", number: 602, apartment: "3C" }, "123-444-555");
library.addUser(user01);
library.addUser(user02);
library.addUser(user03);
console.log("_____________add 2 points:_____________");
library.loanItem(book01, user01);
library.returnItem(book01, user01, new Date("October 21, 2023 23:15:30"));
console.log("_____________rest 1 point:_____________");
library.loanItem(book02, user01);
library.returnItem(book02, user01, new Date("October 13, 2023 23:15:30"));
console.log("_____________add 5 points:_____________");
library.loanItem(magazine01, user01);
library.returnItem(magazine01, user01, new Date("October 29, 2023 23:15:30"));
console.log("____________Show users_____________");
library.getArrayUsers(user01);
console.log("____________no se puede retirar, usuario penalizado_____________");
library.loanItem(magazine02, user01);
// show list of items 
console.log("___________mostrar items____________");
library.getArrayItems(book01);
// // delete user
// console.log("____________borrar un usuario____________");
// library.deleteUser(user01,1);
// library.getArrayUsers(user01);
// // delete items
// console.log("__________borrar item___________")
// library.getArrayItems(book01);
// library.deleteLibraryItem(book01,0);
// library.getArrayItems(book01);
// // edit user 
// console.log("_________editar usuario____________");
// library.editUser(1,new User(  "XXXX",
// { street: "xxxxxx", number: 602, apartment: "3C" },
// "999999999"
// ));
// library.getArrayUsers(user01);
// // edit item
// console.log("editar item");
// library.editLibraryItem(1,new Magazine("..........", 2020, "........."));
// library.getArrayItems(book01);
