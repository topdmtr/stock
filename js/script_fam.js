var peoplesJSON = '[{"idPers":"1","fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"2","indMother":"3"},{"idPers":"2","fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"4","indMother":"5"},{"idPers":"3","fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"6","indMother":"7"},{"idPers":"4","fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"8","indMother":"9"},{"idPers":"5","fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"10","indMother":"11"},{"idPers":"6","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"12","indMother":"13"},{"idPers":"7","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"14","indMother":"15"}]';

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
alert ("Max knee= "+MaxKnee);
 
var currentId;//default
var coordForm;

var indFath = 0;
var indMoth = 0;

function out(currentId, topForm_w, leftForm_w){
	
var person = peoples.find(x => x.idPers === String(currentId));
 alert ("нашлось "+person.fio);

  var formNew;
  var arrForm;
  if (currentId == 1){
  id_Knee = "knee_"+`${person.indKnee}`; 
  alert ("1 колено "+id_Knee);
formNew = `<div id="${id_Knee}" class="divKnee"><form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indKnee}" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br> </form> </div>`;
  $("#forms").append(formNew);
  }
  else {
  formNew = `<form class="new_pers" method="post"> <label>id человека<br> <input class="inpIdPers" type="text" name="id_pers" value="${currentId}" disabled/></label><br> <label>ФИО<br> <input class="editable inpFio" type="text" name="fio" value="${person.fio}"/></label><br> <label>Дата рождения<br> <input class="editable inpBirthDate" type="text" name="birthDate" value="${person.birthDate}"></label><br> <label>Дата смерти<br> <input class="editable inpDaedDate" type="text" name="deadDate" value="${person.deadDate}"></label><br><label>номер колена<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indKnee}" disabled/></label><br> <label>id отец<br> <input class="inpIdPersFath" type="text" name="id_pers_fath" value="${person.indFather}" disabled/></label><br> <label>id мать<br> <input class="inpIdPersMoth" type="text" name="id_pers_moth" value="${person.indMother}" disabled/></label><br>=====<br></form>`;

  id_Knee = "knee_"+`${person.indKnee}`;
  alert ("2 колено "+id_Knee);
  if (!$("div").is("#"+id_Knee)){
    alert ("НЕ СУЩ колено "+id_Knee);
    div_new = `<div id="${id_Knee}" class="divKnee">  </div>`;
  $("#forms").append(div_new);
  }
  $("#"+id_Knee).append(formNew);
  }  
  
  if (person.indKnee < MaxKnee) {
     out(person.indFather,0,0);
  }  
  if (person.indKnee < MaxKnee) {
    out(person.indMother,0,0);
  }
  return;
}

out(1,0,0);

var nameInp = '';
var strJSON;

$(".editable").on('blur', function() {
  currentId = +$(this).closest("form").find("input.inpIdPers").val();//находим идентификатор текущего персонажа
  nameInp = $(this).attr("name");//выясняем имя текущего поля
  var j;
  for (j = 0; j < peoples.length; ++j){
	pers  = peoples [j];
	if (peoples[j].idPers == currentId){
		needNumber = j;//находим номер нужного объекта по идентификатору
		break;
	}	
  }
  peoples[needNumber][nameInp] = $(this).val();
  strJSON = JSON.stringify(peoples);
});

$(".new_pers input").on('blur', function() {
  alert (strJSON);
});
