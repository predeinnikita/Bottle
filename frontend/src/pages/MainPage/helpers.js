export function check_name_adress(name, adress) {
    let adress_parts = adress.split(' ').filter(x => x != 'undefined' && x != 'null').join(' ');
    return name && adress ? `${name}, ${adress_parts}` : !name && adress ? adress_parts : name && !adress ? name : "";
}