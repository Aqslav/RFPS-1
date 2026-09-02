const form = document.getElementById("feedbackForm");

if (form) {
    const details = document.getElementById("details");
    const counter = document.getElementById("counter");
    const message = document.getElementById("formMessage");
    function updateCounter() {
        counter.textContent = `${details.value.length} / 1000`;
    }
    function setError(id, text) {
        document.getElementById(id).textContent = text;
    }
    function clearErrors() {
        document.querySelectorAll(".field small, #consentError").forEach((item) => {
            item.textContent = "";
        });
        message.textContent = "";
    }
    details.addEventListener("input", updateCounter);
    updateCounter();
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        let valid = true;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const age = Number(document.getElementById("age").value);
        const education = document.getElementById("education").value;
        const purpose = document.getElementById("purpose").value;
        const consent = document.getElementById("consent").checked;
        if (name.length < 2) {
            setError("nameError", "Вкажіть ім'я та прізвище.");
            valid = false;
        }
        if (!email.includes("@")) {
            setError("emailError", "Вкажіть коректний E-mail.");
            valid = false;
        }
        if (!Number.isInteger(age) || age < 14 || age > 120) {
            setError("ageError", "Вік має бути від 14 до 120.");
            valid = false;
        }

        if (!education) {
            setError("educationError", "Оберіть освіту.");
            valid = false;
        }

        if (!purpose) {
            setError("purposeError", "Оберіть мету.");
            valid = false;
        }

        if (details.value.trim().length < 5) {
            setError("detailsError", "Напишіть детальніше.");
            valid = false;
        }

        if (!consent) {
            setError("consentError", "Потрібна згода.");
            valid = false;
        }

        message.textContent = valid ? "Форму успішно заповнено." : "Перевірте заповнені поля.";
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            clearErrors();
            updateCounter();
        });
    });
}
