/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HandleEvent_HandleInput_handleInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n/* harmony import */ var _HandleEvent_HandleKeydown_handleKeydown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);\n/* harmony import */ var _misc_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n\n\n\ntry {\n    let mainDiv = document.getElementById('mainDiv');\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_2__.assert)(mainDiv != null, 'mainDiv is null');\n    mainDiv.addEventListener('beforeinput', _HandleEvent_HandleInput_handleInput__WEBPACK_IMPORTED_MODULE_0__.handleInput);\n    mainDiv.addEventListener('keydown', _HandleEvent_HandleKeydown_handleKeydown__WEBPACK_IMPORTED_MODULE_1__.handleKeydown);\n}\ncatch (error) {\n    console.error(error);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQW9FO0FBQ007QUFDbkM7QUFDdkMsSUFDQTtJQUNJLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFFLENBQUM7SUFDbEQsb0RBQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDM0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSw2RUFBVyxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxtRkFBYSxDQUFDLENBQUM7Q0FDdEQ7QUFDRCxPQUFNLEtBQUssRUFDWDtJQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoLy4vc3JjL2luZGV4LnRzP2ZmYjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlSW5wdXQgfSBmcm9tIFwiLi9IYW5kbGVFdmVudC9IYW5kbGVJbnB1dC9oYW5kbGVJbnB1dFwiO1xyXG5pbXBvcnQgeyBoYW5kbGVLZXlkb3duIH0gZnJvbSBcIi4vSGFuZGxlRXZlbnQvSGFuZGxlS2V5ZG93bi9oYW5kbGVLZXlkb3duXCI7XHJcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gXCIuL21pc2MvYXNzZXJ0XCI7XHJcbnRyeVxyXG57XHJcbiAgICBsZXQgbWFpbkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluRGl2JykhO1xyXG4gICAgYXNzZXJ0KG1haW5EaXYgIT0gbnVsbCwgJ21haW5EaXYgaXMgbnVsbCcpO1xyXG4gICAgbWFpbkRpdi5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVpbnB1dCcsIGhhbmRsZUlucHV0KTtcclxuICAgIG1haW5EaXYuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleWRvd24pO1xyXG59XHJcbmNhdGNoKGVycm9yKVxyXG57XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleInput: () => (/* binding */ handleInput)\n/* harmony export */ });\n/* harmony import */ var _misc_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _handleDelete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);\n/* harmony import */ var _handleInsert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);\n\n\n\nfunction handleInput(event) {\n    let selection = window.getSelection();\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(selection != null, 'selection is null');\n    let range = selection.getRangeAt(0);\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(range != null, 'range is null');\n    let container = range.startContainer;\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(container != null, 'container is null');\n    switch (event.inputType) {\n        case 'deleteContentBackward':\n            (0,_handleDelete__WEBPACK_IMPORTED_MODULE_1__.handleDelete)(range, container, event);\n            break;\n        case 'insertText':\n            (0,_handleInsert__WEBPACK_IMPORTED_MODULE_2__.handleInsert)(range, container, event);\n            break;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXlDO0FBQ0c7QUFDRTtBQUN2QyxTQUFTLFdBQVcsQ0FBQyxLQUFpQjtJQUV6QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsb0RBQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDL0MsSUFBSSxLQUFLLEdBQUcsU0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxvREFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNyQyxvREFBTSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUM3QyxRQUFPLEtBQUssQ0FBQyxTQUFTLEVBQ3RCO1FBQ0ksS0FBSyx1QkFBdUI7WUFDeEIsMkRBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU07UUFDVixLQUFLLFlBQVk7WUFDYiwyREFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsTUFBTTtLQUNiO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGgvLi9zcmMvSGFuZGxlRXZlbnQvSGFuZGxlSW5wdXQvaGFuZGxlSW5wdXQudHM/NzFjZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Fzc2VydH0gZnJvbSAnLi4vLi4vbWlzYy9hc3NlcnQnO1xyXG5pbXBvcnQge2hhbmRsZURlbGV0ZX0gZnJvbSAnLi9oYW5kbGVEZWxldGUnO1xyXG5pbXBvcnQgeyBoYW5kbGVJbnNlcnQgfSBmcm9tICcuL2hhbmRsZUluc2VydCc7XHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVJbnB1dChldmVudDogSW5wdXRFdmVudClcclxue1xyXG4gICAgbGV0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGFzc2VydChzZWxlY3Rpb24gIT0gbnVsbCwgJ3NlbGVjdGlvbiBpcyBudWxsJyk7XHJcbiAgICBsZXQgcmFuZ2UgPSBzZWxlY3Rpb24hLmdldFJhbmdlQXQoMCk7XHJcbiAgICBhc3NlcnQocmFuZ2UgIT0gbnVsbCwgJ3JhbmdlIGlzIG51bGwnKTtcclxuICAgIGxldCBjb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuICAgIGFzc2VydChjb250YWluZXIhPW51bGwsICdjb250YWluZXIgaXMgbnVsbCcpO1xyXG4gICAgc3dpdGNoKGV2ZW50LmlucHV0VHlwZSlcclxuICAgIHtcclxuICAgICAgICBjYXNlICdkZWxldGVDb250ZW50QmFja3dhcmQnOlxyXG4gICAgICAgICAgICBoYW5kbGVEZWxldGUocmFuZ2UsIGNvbnRhaW5lciwgZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdpbnNlcnRUZXh0JzpcclxuICAgICAgICAgICAgaGFuZGxlSW5zZXJ0KHJhbmdlLCBjb250YWluZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   assert: () => (/* binding */ assert)\n/* harmony export */ });\nfunction assert(statement, message) {\n    if (!statement) {\n        throw new Error(message);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBUyxNQUFNLENBQUMsU0FBaUIsRUFBRSxPQUFjO0lBQ3BELElBQUksQ0FBQyxTQUFTLEVBQ2Q7UUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGgvLi9zcmMvbWlzYy9hc3NlcnQudHM/N2ExOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHN0YXRlbWVudDpib29sZWFuLCBtZXNzYWdlOnN0cmluZykge1xyXG4gICAgaWYgKCFzdGF0ZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleDelete: () => (/* binding */ handleDelete)\n/* harmony export */ });\nfunction handleDelete(range, container, event) {\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU8sU0FBUyxZQUFZLENBQUMsS0FBWSxFQUFFLFNBQWUsRUFBRSxLQUFpQjtBQUc3RSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aC8uL3NyYy9IYW5kbGVFdmVudC9IYW5kbGVJbnB1dC9oYW5kbGVEZWxldGUudHM/NzE3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaGFuZGxlRGVsZXRlKHJhbmdlOiBSYW5nZSwgY29udGFpbmVyOiBOb2RlLCBldmVudDogSW5wdXRFdmVudClcclxue1xyXG4gICAgXHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleInsert: () => (/* binding */ handleInsert)\n/* harmony export */ });\n/* harmony import */ var _CreateElement_createFormula__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);\n/* harmony import */ var _misc_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n\n\n\nfunction handleInsert(range, container, event) {\n    switch (event.data) {\n        case '$':\n            handleDollarSign(range, container, event);\n            break;\n    }\n}\nfunction handleDollarSign(range, container, event) {\n    if (container.nodeName == '#text') {\n        console.log('The container is #text, finding its parent element');\n        container = container.parentElement;\n        (0,_misc_assert__WEBPACK_IMPORTED_MODULE_2__.assert)(container != null, 'The container is #text and it has no parent element');\n    }\n    let htmlContainer = container;\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_2__.assert)(htmlContainer.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__.ATT.CONTAINER_TYPE), 'container doesn\\'t have attribute CONTAINER_TYPE');\n    if (htmlContainer.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__.ATT.CONTAINER_TYPE) == _constants__WEBPACK_IMPORTED_MODULE_1__.CT.MAINDIV) {\n        // take control\n        event.preventDefault();\n        // create element\n        let formulaElement = (0,_CreateElement_createFormula__WEBPACK_IMPORTED_MODULE_0__.createFormula)();\n        // white space elimination\n        if (htmlContainer.innerHTML == '&nbsp;') {\n            htmlContainer.innerHTML = '';\n        }\n        // put into place\n        htmlContainer.appendChild(formulaElement);\n        // set cursor\n        range.setStart(formulaElement, 0);\n        // send log\n        console.log('Inserted a formula element!');\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWtFO0FBQ3hCO0FBQ0M7QUFFcEMsU0FBUyxZQUFZLENBQUMsS0FBWSxFQUFFLFNBQWUsRUFBRSxLQUFpQjtJQUV6RSxRQUFPLEtBQUssQ0FBQyxJQUFJLEVBQ2pCO1FBQ0ksS0FBSyxHQUFHO1lBQ0osZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsU0FBZSxFQUFFLEtBQWlCO0lBR3RFLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQ2pDO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYyxDQUFDO1FBQ3JDLG9EQUFNLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRSxxREFBcUQsQ0FBQyxDQUFDO0tBQ2xGO0lBQ0QsSUFBSSxhQUFhLEdBQUcsU0FBd0IsQ0FBQztJQUM3QyxvREFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsMkNBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO0lBQzNHLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQywyQ0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLDBDQUFFLENBQUMsT0FBTyxFQUNoRTtRQUNJLGVBQWU7UUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsaUJBQWlCO1FBQ2pCLElBQUksY0FBYyxHQUFHLDJFQUFhLEVBQUUsQ0FBQztRQUNyQywwQkFBMEI7UUFDMUIsSUFBSSxhQUFhLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFDdkM7WUFDSSxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNoQztRQUNELGlCQUFpQjtRQUNqQixhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLGFBQWE7UUFDYixLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxXQUFXO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0tBQzlDO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGgvLi9zcmMvSGFuZGxlRXZlbnQvSGFuZGxlSW5wdXQvaGFuZGxlSW5zZXJ0LnRzPzc5N2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRm9ybXVsYSB9IGZyb20gXCIuLi8uLi9DcmVhdGVFbGVtZW50L2NyZWF0ZUZvcm11bGFcIjtcclxuaW1wb3J0IHsgQVRULCBDVCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uLy4uL21pc2MvYXNzZXJ0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlSW5zZXJ0KHJhbmdlOiBSYW5nZSwgY29udGFpbmVyOiBOb2RlLCBldmVudDogSW5wdXRFdmVudClcclxue1xyXG4gICAgc3dpdGNoKGV2ZW50LmRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgY2FzZSAnJCc6XHJcbiAgICAgICAgICAgIGhhbmRsZURvbGxhclNpZ24ocmFuZ2UsIGNvbnRhaW5lciwgZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBoYW5kbGVEb2xsYXJTaWduKHJhbmdlOiBSYW5nZSwgY29udGFpbmVyOiBOb2RlLCBldmVudDogSW5wdXRFdmVudClcclxue1xyXG4gICAgXHJcbiAgICBpZiAoY29udGFpbmVyLm5vZGVOYW1lID09ICcjdGV4dCcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1RoZSBjb250YWluZXIgaXMgI3RleHQsIGZpbmRpbmcgaXRzIHBhcmVudCBlbGVtZW50Jyk7XHJcbiAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnQhO1xyXG4gICAgICAgIGFzc2VydChjb250YWluZXIhPW51bGwsICdUaGUgY29udGFpbmVyIGlzICN0ZXh0IGFuZCBpdCBoYXMgbm8gcGFyZW50IGVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIGxldCBodG1sQ29udGFpbmVyID0gY29udGFpbmVyIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgYXNzZXJ0KGh0bWxDb250YWluZXIuaGFzQXR0cmlidXRlKEFUVC5DT05UQUlORVJfVFlQRSksICdjb250YWluZXIgZG9lc25cXCd0IGhhdmUgYXR0cmlidXRlIENPTlRBSU5FUl9UWVBFJyk7XHJcbiAgICBpZiAoaHRtbENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoQVRULkNPTlRBSU5FUl9UWVBFKSA9PSBDVC5NQUlORElWKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHRha2UgY29udHJvbFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnRcclxuICAgICAgICBsZXQgZm9ybXVsYUVsZW1lbnQgPSBjcmVhdGVGb3JtdWxhKCk7XHJcbiAgICAgICAgLy8gd2hpdGUgc3BhY2UgZWxpbWluYXRpb25cclxuICAgICAgICBpZiAoaHRtbENvbnRhaW5lci5pbm5lckhUTUwgPT0gJyZuYnNwOycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBodG1sQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwdXQgaW50byBwbGFjZVxyXG4gICAgICAgIGh0bWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybXVsYUVsZW1lbnQpO1xyXG4gICAgICAgIC8vIHNldCBjdXJzb3JcclxuICAgICAgICByYW5nZS5zZXRTdGFydChmb3JtdWxhRWxlbWVudCwgMCk7XHJcbiAgICAgICAgLy8gc2VuZCBsb2dcclxuICAgICAgICBjb25zb2xlLmxvZygnSW5zZXJ0ZWQgYSBmb3JtdWxhIGVsZW1lbnQhJyk7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createFormula: () => (/* binding */ createFormula)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);\n\nfunction createFormula() {\n    let formulaElement = document.createElement('span');\n    // set CONTAINER_TYPE attribute\n    formulaElement.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__.ATT.CONTAINER_TYPE, _constants__WEBPACK_IMPORTED_MODULE_0__.CT.FORMULA);\n    // assign classes\n    formulaElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CLASS.FORMULA);\n    // assign initial content\n    formulaElement.innerHTML = '&nbsp;';\n    return formulaElement;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE4QztBQUV2QyxTQUFTLGFBQWE7SUFFekIsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCwrQkFBK0I7SUFDL0IsY0FBYyxDQUFDLFlBQVksQ0FBQywyQ0FBRyxDQUFDLGNBQWMsRUFBRSwwQ0FBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVELGlCQUFpQjtJQUNqQixjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2Q0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLHlCQUF5QjtJQUN6QixjQUFjLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUNwQyxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aC8uL3NyYy9DcmVhdGVFbGVtZW50L2NyZWF0ZUZvcm11bGEudHM/NGM3OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBVFQsIENMQVNTLCBDVCB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtdWxhKCk6SFRNTFNwYW5FbGVtZW50XHJcbntcclxuICAgIGxldCBmb3JtdWxhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIC8vIHNldCBDT05UQUlORVJfVFlQRSBhdHRyaWJ1dGVcclxuICAgIGZvcm11bGFFbGVtZW50LnNldEF0dHJpYnV0ZShBVFQuQ09OVEFJTkVSX1RZUEUsIENULkZPUk1VTEEpO1xyXG4gICAgLy8gYXNzaWduIGNsYXNzZXNcclxuICAgIGZvcm11bGFFbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1MuRk9STVVMQSk7XHJcbiAgICAvLyBhc3NpZ24gaW5pdGlhbCBjb250ZW50XHJcbiAgICBmb3JtdWxhRWxlbWVudC5pbm5lckhUTUwgPSAnJm5ic3A7JztcclxuICAgIHJldHVybiBmb3JtdWxhRWxlbWVudDtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ATT: () => (/* binding */ ATT),\n/* harmony export */   CLASS: () => (/* binding */ CLASS),\n/* harmony export */   CT: () => (/* binding */ CT)\n/* harmony export */ });\nvar ATT;\n(function (ATT) {\n    ATT[\"CONTAINER_TYPE\"] = \"CONTAINER_TYPE\";\n})(ATT || (ATT = {}));\n;\nvar CT;\n(function (CT) {\n    CT[\"MAINDIV\"] = \"MAINDIV\";\n    CT[\"FORMULA\"] = \"FORMULA\";\n    CT[\"TEXTCONTAINER\"] = \"TEXTCONTAINER\";\n})(CT || (CT = {}));\nvar CLASS;\n(function (CLASS) {\n    CLASS[\"MAINDIV\"] = \"main-div\";\n    CLASS[\"FORMULA\"] = \"formula\";\n    CLASS[\"TEXTCONTAINER\"] = \"text-container\";\n})(CLASS || (CLASS = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEdBR1g7QUFIRCxXQUFZLEdBQUc7SUFFWCx3Q0FBaUM7QUFDckMsQ0FBQyxFQUhXLEdBQUcsS0FBSCxHQUFHLFFBR2Q7QUFBQSxDQUFDO0FBQ0YsSUFBWSxFQUtYO0FBTEQsV0FBWSxFQUFFO0lBRVYseUJBQW1CO0lBQ25CLHlCQUFpQjtJQUNqQixxQ0FBK0I7QUFDbkMsQ0FBQyxFQUxXLEVBQUUsS0FBRixFQUFFLFFBS2I7QUFDRCxJQUFZLEtBS1g7QUFMRCxXQUFZLEtBQUs7SUFFYiw2QkFBa0I7SUFDbEIsNEJBQWlCO0lBQ2pCLHlDQUFnQztBQUNwQyxDQUFDLEVBTFcsS0FBSyxLQUFMLEtBQUssUUFLaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoLy4vc3JjL2NvbnN0YW50cy50cz84NWVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEFUVFxyXG57XHJcbiAgICBDT05UQUlORVJfVFlQRSA9ICdDT05UQUlORVJfVFlQRSdcclxufTtcclxuZXhwb3J0IGVudW0gQ1Rcclxue1xyXG4gICAgTUFJTkRJViA9ICdNQUlORElWJyxcclxuICAgIEZPUk1VTEE9J0ZPUk1VTEEnLFxyXG4gICAgVEVYVENPTlRBSU5FUiA9ICdURVhUQ09OVEFJTkVSJyxcclxufVxyXG5leHBvcnQgZW51bSBDTEFTU1xyXG57XHJcbiAgICBNQUlORElWPSdtYWluLWRpdicsXHJcbiAgICBGT1JNVUxBPSdmb3JtdWxhJyxcclxuICAgIFRFWFRDT05UQUlORVIgPSAndGV4dC1jb250YWluZXInXHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6\n");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleKeydown: () => (/* binding */ handleKeydown)\n/* harmony export */ });\n/* harmony import */ var _misc_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n\nfunction handleKeydown(event) {\n    let selection = window.getSelection();\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(selection != null, 'selection is null');\n    let range = selection.getRangeAt(0);\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(range != null, 'range is null');\n    let container = range.startContainer;\n    (0,_misc_assert__WEBPACK_IMPORTED_MODULE_0__.assert)(container != null, 'container is null');\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUVwQyxTQUFTLGFBQWEsQ0FBQyxLQUFvQjtJQUU5QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsb0RBQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDL0MsSUFBSSxLQUFLLEdBQUcsU0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxvREFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNyQyxvREFBTSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUVqRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aC8uL3NyYy9IYW5kbGVFdmVudC9IYW5kbGVLZXlkb3duL2hhbmRsZUtleWRvd24udHM/NTI2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vLi4vbWlzYy9hc3NlcnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KVxyXG57XHJcbiAgICBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgYXNzZXJ0KHNlbGVjdGlvbiAhPSBudWxsLCAnc2VsZWN0aW9uIGlzIG51bGwnKTtcclxuICAgIGxldCByYW5nZSA9IHNlbGVjdGlvbiEuZ2V0UmFuZ2VBdCgwKTtcclxuICAgIGFzc2VydChyYW5nZSAhPSBudWxsLCAncmFuZ2UgaXMgbnVsbCcpO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xyXG4gICAgYXNzZXJ0KGNvbnRhaW5lciE9bnVsbCwgJ2NvbnRhaW5lciBpcyBudWxsJyk7XHJcbiAgICBcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///7\n");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;