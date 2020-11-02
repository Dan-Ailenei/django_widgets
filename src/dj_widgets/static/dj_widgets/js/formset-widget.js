function adaugaIntrebareHandler(management_id, adauga_raspuns_id, lista_raspunsuri_id, preview_id){
    $(() => {
        const total_forms = $(`#${management_id}`).children(":first");
        const lista_raspunsuri = $(`#${lista_raspunsuri_id}`);
        const num_forms = lista_raspunsuri.children().length;
        total_forms.val(num_forms);

        // setez butoane de delete pentru start
        lista_raspunsuri.children().each(function (i, l) {
            if (i > 2){
                const delete_button = $("<input>", {type: "button", value: "Sterge intrebare", id: num_forms});
                creareStergere(delete_button, total_forms, lista_raspunsuri);
                $(l).children().last().after(delete_button);
            }
        });


        $(`#${adauga_raspuns_id}`).click(function() {
           const num_forms = parseInt(total_forms.val());

           const new_item = lista_raspunsuri.children().last().clone();
           if(new_item.children().last().attr("type") === "button"){
               new_item.children().last().remove();
           }
           lista_raspunsuri.append(new_item);
           update_new_item(new_item, num_forms - 1, num_forms, true);
           const delete_button = $("<input>", {type: "button", value: "Sterge intrebare", id: num_forms});
           creareStergere(delete_button, total_forms, lista_raspunsuri);
           new_item.children().last().after(delete_button);

           total_forms.val(num_forms + 1);
        });
    });
}

function creareStergere(delete_button, total_forms, lista_raspunsuri) {
    $(delete_button).click(function () {
        const num_forms = parseInt(total_forms.val());
        const parent = $(this).parent();

        parent.prev().nextAll().each(function () {
            const current = $(this);
            update_new_item(current, current.index(), current.index() - 1)
        });
        parent.remove();
        total_forms.val(num_forms - 1);
    })
}

function update_new_item(new_item, num_forms_old, num_forms_new, empty=false) {
    new_item.find("input").each((i, l) => {
       if ($(l).attr("type") !== "button"){
           const name = $(l).attr('name').replace(`-${num_forms_old}-`, `-${num_forms_new}-`);
           const id = `id_${name}`;
           const el = $(l).attr({name: name, id: id});
           if (el.attr("type") === "radio"){
               el.val(el.val().replace(`-${num_forms_old}-`, `-${num_forms_new}-`));
           } else if (empty){
               el.val('');
           }
       }
   });
}
