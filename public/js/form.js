const form = document.querySelector("form"),
    nom = document.querySelector("#contact-name"),
    depart = document.querySelector("#contact-depart"),
    destination = document.querySelector("#contact-destination"),
    nombre = document.querySelector("#contact-people"),
    email = document.querySelector("#contact-email"),
    message = document.querySelector("#contact-message"),
    dates = document.querySelector("#contact-date"),
    tel = document.querySelector('#contact-phone')
    heures = document.querySelector('#contact-time')
form.addEventListener("submit", async e => {
    e.preventDefault();
    let a = nom.value,
        r = depart.value,
        t = destination.value,
        l = nombre.value,
        n = email.value,
        o = message.value,
        d = dates.value,
        p = tel.value;
        j= heures.value
    try {
        await axios.post("/.netlify/functions/sendEmail", {
            name: a,
            start: r,
            destinations: t,
            numbers: l,
            emails: n,
            dates: d,
            messages: o,
            tele: p,
            heure: j 
        }), nom.value = "", depart.value = "", destination.value = "", nombre.value = "", email.value = "", message.value = "",dates.value="", tel.value ="", heures.value="" 
    } catch (s) {
        console.error("oups! elle y a une erreur:", s)
    }
});