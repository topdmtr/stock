var peoplesJSON = '[{"fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"1","indMother":"2"},{"fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"3","indMother":"4"},{"fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"","indMother":""},{"fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"","indMother":""},{"fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"","indMother":""}]';

var peoples = []; // объявление массива

peoples = JSON.parse(peoplesJSON);

var pers;
var i;
var MaxKnee = 0;

for (i = 0; i < peoples.length; ++i){
	pers  = peoples [i];
	if (pers.indKnee > MaxKnee){
		MaxKnee = pers.indKnee;//Find out max deep
	}	
}
 
var currentId;//default
// style="top: 252px;"
// var topForm, leftForm;
 var coordForm;
// coordForm = $("#forms").offset(); // Возвращает: Object{top,left}
// alert (coordForm.top+", "+coordForm.left);

var indFath = 0;
var indMoth = 0;

function out(currentId, topForm_w, leftForm_w){
  var person  = peoples [currentId];
  var formNew;
  var arrForm;
//  var coordForm;
  var topForm = topForm_w;
  var leftForm = leftForm_w;
  if (currentId <= 0){
  // alert ("первый "+currentId);
  id_Knee = "knee_"+`${person.indKnee}`;
  alert ("колено "+id_Knee);
//  formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;
formNew = `<div id="${id_Knee}" class="divKnee"><form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indKnee}" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br> </form> </div>`;
  $("#forms").append(formNew);
  // arrForm = $.new_pers;
  coordForm = $(".new_pers").offset(); // Возвращает: Object{top,left}
  // coordForm.left = coordForm.left + 85;
  // alert ("первый "+coordForm.top+", "+coordForm.left);
  }
  else {
  //alert ("другие "+currentId);
  // alert ("первый "+coordForm.top+", "+coordForm.left);
  //formNew = `<form class="new_pers" style="top: ${topForm}px; left: ${leftForm}px;" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;
  formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indKnee}" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;

  id_Knee = "knee_"+`${person.indKnee}`;
  alert ("колено "+id_Knee);
  if (!$("div").is("#"+id_Knee)){
    alert ("НЕ СУЩ колено "+id_Knee);
    div_new = `<div id="${id_Knee}" class="divKnee">  </div>`;
  $("#forms").append(div_new);
  }

  //$("#forms").append(formNew);
  $("#"+id_Knee).append(formNew);
  }
 
  if (person.indFather > 0) {
    coordForm.top = coordForm.top + 260;
    coordForm.left = coordForm.left - 180;
    // alert ("отец "+coordForm.top+", "+coordForm.left);
    indFath = 1;
    out(person.indFather,coordForm.top,coordForm.left);
  }
  else{
	  if (indFath > 0) {
        coordForm.top = coordForm.top - 260;
        coordForm.left = coordForm.left + 180;
	  }
  }
  if (person.indMother > 0) {
    coordForm.top = coordForm.top + 260;
    coordForm.left = coordForm.left + 180;
    // alert ("мать "+coordForm.top+", "+coordForm.left);
    indMoth = 1;
    out(person.indMother,coordForm.top,coordForm.left);
  }
  else{
	  if (indMoth > 0) {
        coordForm.top = coordForm.top - 260;
        coordForm.left = coordForm.left - 180;
	  }
  }
  return;
}

function out_empty(currentId){
  formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value=""/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value=""></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value=""></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="" disabled/></label><br>=====<br></form>`;

  id_Knee = "knee_"+`${person.indKnee}`;
  alert ("колено "+id_Knee);
  if (!$("div").is("#"+id_Knee)){
    alert ("НЕ СУЩ колено "+id_Knee);
    div_new = `<div id="${id_Knee}" class="divKnee">  </div>`;
  $("#forms").append(div_new);
  }

  //$("#forms").append(formNew);
  $("#"+id_Knee).append(formNew);
	
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
