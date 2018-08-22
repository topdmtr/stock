var tree = {
  peoples: [],
  MaxKnee: 0,
  peoplesJSON: '[{"idPers":"1","fio":"Петя Васильевич Пупкин","birthDate":"02.02.1930","deadDate":"02.02.1950","indKnee":"0","indFather":"2","indMother":"3"},{"idPers":"2","fio":"Вася Сидорович Пупкин","birthDate":"02.02.1910","deadDate":"02.02.1960","indKnee":"1","indFather":"4","indMother":"5"},{"idPers":"3","fio":"Маша Ивановна Дубкина","birthDate":"03.03.1910","deadDate":"03.03.1960","indKnee":"1","indFather":"6","indMother":"7"},{"idPers":"4","fio":"Сидор Ильич Пупкин","birthDate":"02.02.1870","deadDate":"02.02.1930","indKnee":"2","indFather":"8","indMother":"9"},{"idPers":"5","fio":"Катя Савишна Жукина","birthDate":"03.03.1880","deadDate":"03.03.1935","indKnee":"2","indFather":"10","indMother":"11"},{"idPers":"6","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"12","indMother":"13"},{"idPers":"7","fio":"","birthDate":"","deadDate":"","indKnee":"2","indFather":"14","indMother":"15"}]',

  init: function() {
    this.peoples = JSON.parse(this.peoplesJSON);
    for (i = 0; i < this.peoples.length; i++) {
      if (this.peoples[i].indKnee > this.MaxKnee) {
        this.MaxKnee = this.peoples[i].indKnee; //Find out max deep
      }
    }
  },

  out: function(currentId, childId) {
    var person = this.peoples.find(x => x.idPers === String(currentId));
    var active = this.isActive(currentId) ? "active" : "";
    var addFather = this.isActive(person.indFather) ? "" : `<a href='' class='addParent addFather' data-id="${person.indFather}">Отец</a>`;
    var addMother = this.isActive(person.indMother) ? "" : `<a href='' class='addParent addMother' data-id="${person.indMother}">Мать</a>`;
    var formNew = `<form class="new_pers ${active}" method="post" data-id="${currentId}" data-knee="${person.indKnee}" data-mother_id="${person.indMother}" data-father_id="${person.indFather}"> <input class="editable inpFio" type="text" placeholder="ФИО" name="fio" value="${person.fio}"/><div class="dates"><input class="editable inpBirthDate" type="text" name="birthDate" placeholder="Дата рождения" value="${person.birthDate}"> - <input class="editable inpDaedDate" type="text" name="deadDate" placeholder="Дата смерти" value="${person.deadDate}"></div> <div class="addParents">${addFather}${addMother}</div></form>`;

    if (!$("div").is("#knee_" + person.indKnee)) {
      $("#forms").append(`<div id="knee_${person.indKnee}" class="divKnee">  </div>`);
    }

    $("#knee_" + person.indKnee).append(formNew);

    if (person.indKnee < this.MaxKnee) {
      this.out(person.indFather, currentId);
      this.out(person.indMother, currentId);
    }
    return;
  },

  updateField: function(currentId, nameInp, value) {
    for (j = 0; j < this.peoples.length; ++j) {
      if (this.peoples[j].idPers == currentId) { // номер нужного объекта по идентификатору
        this.peoples[j][nameInp] = value;
        this.strJSON = JSON.stringify(this.peoples);
        console.log(this.strJSON);
        break;
      }
    }
  },
  isActive: function(currentId) {
    var person = this.peoples.find(x => x.idPers === String(currentId));
    if (!person) return false;
    var data = person.fio + person.birthDate + person.deadDate;
    if (data == "") return false;
    return true;
  },
  getCoords: function(id) {
    el = $(`.new_pers[data-id="${id}"]`);
    x = el.position().left;
    y = el.position().top;

    return {
      x: x,
      y: y,
      h: el.outerHeight(),
      w: el.outerWidth()
    };
  },

  drawLines: function(currentId, childId) {
    var person = this.peoples.find(x => x.idPers === String(currentId));
    if (childId && this.isActive(currentId)) {
      lineId = `line${childId}to${currentId}`;
      $('#lines').append(`<svg><line id="${lineId}" stroke="gray"/></svg>`);
      childCoords = this.getCoords(childId);
      thisCoords = this.getCoords(currentId);
      $(`#${lineId}`).attr('x1', childCoords.x + childCoords.w / 2).attr('y1', childCoords.y + childCoords.h).attr('x2', thisCoords.x + thisCoords.w / 2).attr('y2', thisCoords.y);
    }

    if (person.indKnee < this.MaxKnee) {
      this.drawLines(person.indFather, currentId);
      this.drawLines(person.indMother, currentId);
    }
    return;
  }


}

$(function() {

  $(".editable").on('blur', function() {
    tree.updateField(+$(this).closest("form").data("id"), $(this).attr("name"), $(this).val());
  });

  $(window).resize(function() {
    $('#lines').empty();
    tree.drawLines(1);
  });

  $(document).on("click", ".addParent", function(e) {
    e.preventDefault();
    id = $(this).data("id");
    $(`.new_pers[data-id="${id}"]`).addClass("active");

    /***
      to be continued =)

    ***/
  });

});

tree.init();
tree.out(1);
tree.drawLines(1);
