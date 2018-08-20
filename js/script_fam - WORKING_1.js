var peoplesJSON = '[{"fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indFather":"1","indMother":"2"},{"fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indFather":"3","indMother":"4"},{"fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indFather":"","indMother":""},{"fio":"Сидор Казимирович Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indFather":"","indMother":""},{"fio":"Наталья Александровна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indFather":"","indMother":""}]';

var peoples = []; // объявление массива

peoples = JSON.parse(peoplesJSON);

var currentId = 0;//default
// style="top: 252px;"
var topForm, leftForm;
var coordForm;
// coordForm = $("#forms").offset(); // Возвращает: Object{top,left}
// alert (coordForm.top+", "+coordForm.left);

function out(currentId, topForm, leftForm){
  var person  = peoples [currentId];
  var formNew;
  var arrForm;
  if (currentId <= 0){
  alert ("первый "+currentId);
  formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;
  $("#forms").append(formNew);
  // arrForm = $.new_pers;
  coordForm = $(".new_pers").offset(); // Возвращает: Object{top,left}
  coordForm.left = coordForm.left + 85;
  alert ("первый "+coordForm.top+", "+coordForm.left);
  }
  else {
  alert ("другие "+currentId);
  alert ("первый "+coordForm.top+", "+coordForm.left);
  formNew = `<form class="new_pers" style="top: ${topForm}px; left: ${leftForm}px;" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;
  $("#forms").append(formNew);
  // arrForm = $.new_pers;
  }

  if (person.indFather > 0) {
    coordForm.top = coordForm.top + 260;
    coordForm.left = coordForm.left - 90;
    alert ("отец "+coordForm.top+", "+coordForm.left);
    out(person.indFather,coordForm.top,coordForm.left);
  }
  if (person.indMother > 0) {
    coordForm.top = coordForm.top + 260;
    coordForm.left = coordForm.left + 90;
    alert ("мать "+coordForm.top+", "+coordForm.left);
    out(person.indMother,coordForm.top,coordForm.left);
  }
  return;
}

out(0,0,0);
// Here is pioneer apostrophe
// peoples.forEach(function(person, currentId, peoples) {
//   var formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;
//   $("#forms").append(formNew);
// });

var nameInp = '';
var strJSON;

$(".editable").on('blur', function() {
  currentId = +$(this).closest("form").find("input.inpIdPers").val();
  nameInp = $(this).attr("name");
  peoples[currentId][nameInp] = $(this).val();
  strJSON = JSON.stringify(peoples);
});

$(".new_pers input").on('blur', function() {
  alert (strJSON);
});
