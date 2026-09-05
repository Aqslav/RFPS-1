const activityDirections = [
    { id: 101, name: "Створення сайтів", department: "Відділ веб-розробки", govRelation: "Мінцифри", readsDay1: 120, readsDay2: 150, durationYears: 1 },
    { id: 104, name: "Аналітика даних", department: "Відділ аналітики", govRelation: "Органи місцевого самоврядування", readsDay1: 90, readsDay2: 80, durationYears: 0.5 },
    { id: 102, name: "Графічний дизайн", department: "Дизайн-студія", govRelation: "Міністерство культури", readsDay1: 200, readsDay2: 210, durationYears: 1 },
    { id: 108, name: "ІТ-Консалтинг", department: "Консалтинговий відділ", govRelation: "Не передбачається", readsDay1: 60, readsDay2: 45, durationYears: 2 },
    { id: 103, name: "Кібербезпека", department: "Відділ безпеки", govRelation: "Держспецзв'язку", readsDay1: 310, readsDay2: 290, durationYears: 3 },
    { id: 107, name: "Хмарні сервіси", department: "Сектор інфраструктури", govRelation: "Мінцифри", readsDay1: 140, readsDay2: 130, durationYears: 2 },
    { id: 105, name: "SMM та Маркетинг", department: "Відділ реклами", govRelation: "Не передбачається", readsDay1: 500, readsDay2: 450, durationYears: 0.5 },
    { id: 110, name: "Розробка мобільних додатків", department: "Відділ веб-розробки", govRelation: "Мінцифри", readsDay1: 220, readsDay2: 190, durationYears: 1 },
    { id: 106, name: "Юридичний супровід ІТ", department: "Юридичний відділ", govRelation: "Міністерство юстиції", readsDay1: 75, readsDay2: 40, durationYears: 3 },
    { id: 109, name: "Технічна підтримка 24/7", department: "Служба підтримки", govRelation: "Не передбачається", readsDay1: 400, readsDay2: 380, durationYears: 0.5 }
];

function sortAndAverageByDuration(directions) {
    const sorted = [...directions].sort((a, b) => a.durationYears - b.durationYears);
    const groups = {};
    sorted.forEach(item => {
        const dur = item.durationYears;
        if (!groups[dur]) groups[dur] = [];
        const avgReads = (item.readsDay1 + item.readsDay2) / 2;
        groups[dur].push(avgReads);
    });
    const averagesByDuration = {};
    for (const dur in groups) {
        const sum = groups[dur].reduce((acc, val) => acc + val, 0);
        averagesByDuration[dur] = sum / groups[dur].length;
    }
    return { sortedDirections: sorted, averagesByDuration };
}

function getMinReadsDay2Department(directions) {
    if (!directions || directions.length === 0) return null;
    let minItem = directions[0];
    for (let i = 1; i < directions.length; i++) {
        if (directions[i].readsDay2 < minItem.readsDay2) {
            minItem = directions[i];
        }
    }
    return {
        directionName: minItem.name,
        department: minItem.department,
        readsDay2: minItem.readsDay2
    };
}

function addDirection(directions, newDir) {
    const isComplete = newDir.id !== undefined && newDir.id !== null &&
                        newDir.name && newDir.department && newDir.govRelation &&
                        newDir.readsDay1 !== undefined && newDir.readsDay2 !== undefined &&
                        newDir.durationYears !== undefined;
    const listCopy = [...directions];
    if (!isComplete) {
        listCopy.push(newDir);
    } else {
        let inserted = false;
        for (let i = 0; i < listCopy.length; i++) {
            if (listCopy[i].id > newDir.id) {
                listCopy.splice(i, 0, newDir);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            listCopy.push(newDir);
        }
    }
    return listCopy;
}
function calculateCombinedDuration(services) {
    const count = services.length;
    if (count === 0) return 0;

    if (count === 1) {
        return services[0].durationYears * 0.95;
    } else if (count <= 3) {
        const total = services.reduce((sum, s) => sum + s.durationYears, 0);
        return total * 0.95;
    } else {
        return services.reduce((sum, s) => sum + (s.durationYears * 0.6), 0);
    }
}
class UserAccount {
    constructor(lastName, firstName, age, education, purpose, date, time) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = Number(age);
        this.education = education;
        this.purpose = purpose;
        this.date = date; 
        this.time = time; 
    }

    getFullName() {
        return `${this.lastName} ${this.firstName}`;
    }

    getMonth() {
        return this.date.split('-')[1];
    }

    isWorkingHours() {
        const [hours, minutes] = this.time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const start = 9 * 60;  
        const end = 17 * 60;
        return totalMinutes >= start && totalMinutes <= end;
    }
}

class UserRegistry {
    constructor(users = []) {
        this.users = users;
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsersByMonthAndTime(monthStr, targetTime) {
        return this.users.filter(u => u.getMonth() === monthStr && u.time === targetTime);
    }

    getAverageAge() {
        if (this.users.length === 0) return 0;
        const totalAge = this.users.reduce((sum, u) => sum + u.age, 0);
        return (totalAge / this.users.length).toFixed(1);
    }

    classifyUsers() {
        const result = {
            "середній за віком, робочий час": [],
            "похилого віку, неробочий час": [],
            "інші": []
        };

        this.users.forEach(u => {
            const isWorkTime = u.isWorkingHours();
            const isMiddleAge = u.age >= 18 && u.age < 60;
            const isSeniorAge = u.age >= 60;

            if (isMiddleAge && isWorkTime) {
                result["середній за віком, робочий час"].push(u);
            } else if (isSeniorAge && !isWorkTime) {
                result["похилого віку, неробочий час"].push(u);
            } else {
                result["інші"].push(u);
            }
        });

        return {
            classified: result,
            counts: {
                middleWorking: result["середній за віком, робочий час"].length,
                seniorOffHours: result["похилого віку, неробочий час"].length,
                others: result["інші"].length
            }
        };
    }

    getSortedWithPurpose() {
        const sorted = [...this.users].sort((a, b) => a.getFullName().localeCompare(b.getFullName(), 'uk'));
        return sorted.map(u => `${u.getFullName()} — Мета: ${u.purpose}`);
    }
}

const initialUsers = [
    new UserAccount("Коваленко", "Олексій", 25, "Вища", "Співпраця", "2026-05-10", "10:30"),
    new UserAccount("Петренко", "Марія", 62, "Вища", "Пропозиція", "2026-05-12", "18:15"),
    new UserAccount("Сидоренко", "Іван", 45, "Повна", "Скарга на порушення права власності", "2026-05-10", "10:30"),
    new UserAccount("Бондаренко", "Олена", 65, "Вища", "Наявність помилки", "2026-06-01", "20:00"),
    new UserAccount("Ткаченко", "Василь", 19, "Неповна", "Співпраця", "2026-05-15", "14:00"),
    new UserAccount("Шевченко", "Анна", 34, "Вища", "Пропозиція", "2026-07-20", "09:15"),
    new UserAccount("Кравченко", "Микола", 68, "Професійна", "Скарга на порушення права власності", "2026-05-10", "08:00"),
    new UserAccount("Олійник", "Ольга", 50, "Вища", "Наявність помилки", "2026-05-18", "16:45"),
    new UserAccount("Бойко", "Дмитро", 16, "Неповна", "Співпраця", "2026-06-11", "12:00"),
    new UserAccount("Захарченко", "Наталія", 71, "Вища", "Пропозиція", "2026-05-22", "19:30")
];

const registry = new UserRegistry(initialUsers);

let siteHour = new Date().getHours();

function updateHomeBrightness() {
    const isNight = siteHour >= 21 || siteHour < 6;
    document.body.classList.toggle("night-mode", isNight);
}

Object.defineProperty(window, "currentHour", {
    configurable: true,
    get() {
        return siteHour;
    },
    set(value) {
        const hour = Number(value);
        if (Number.isInteger(hour) && hour >= 0 && hour <= 23) {
            siteHour = hour;
            updateHomeBrightness();
        }
    }
});

updateHomeBrightness();

const workUpdate = document.getElementById("workUpdate");

const messages = [
    "Різдвяні канікули: 25 грудня - 1 січня. Всі запити будуть оброблені після свят.",
    "Новорічні свята: 31 грудня - 2 січня. Всі запити будуть оброблені після свят.",
    "Релокація головного офісу: з 15 по 20 лютого. Можливі затримки у відповіді на запити.",
]
if (workUpdate) {
    function printWorkUpdate(text) {
        workUpdate.textContent = text;
    }
}

const warningModal = document.getElementById("warningModal");

if (warningModal) {
    const warningText = document.getElementById("warningText");
    const warningConfirmed = document.getElementById("warningConfirmed");
    const warningClose = document.getElementById("warningClose");
    const warningContinue = document.getElementById("warningContinue");
    let warningAcknowledged = false;
    let warningClosed = false;

    function closeWarning(acknowledge = false) {
        warningModal.hidden = true;
        warningConfirmed.checked = false;
        warningContinue.disabled = true;
        warningAcknowledged = acknowledge;
        warningClosed = true;
    }

    document.querySelectorAll(".direction-card[data-warning]").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            if (warningAcknowledged || warningClosed) 
                return;
            warningText.textContent = card.dataset.warning;
            warningModal.hidden = false;
        });
        card.addEventListener("mouseleave", () => {
            warningClosed = false;
        });

    });

    warningConfirmed.addEventListener("change", () => {
        warningContinue.disabled = !warningConfirmed.checked;
    });

    warningClose.addEventListener("click", () => closeWarning(false));
    warningContinue.addEventListener("click", () => closeWarning(true));
    warningModal.addEventListener("click", (event) => {
        if (event.target === warningModal) 
            closeWarning();
    });
}

const form = document.getElementById("feedbackForm");

if (form) {
    const details = document.getElementById("details");
    const counter = document.getElementById("counter");
    const message = document.getElementById("formMessage");

    function updateCounter() {
        counter.textContent = `${details.value.length} / 1000`;
    }

    function setError(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function clearErrors() {
        document.querySelectorAll(".field small, #consentError").forEach((item) => {
            item.textContent = "";
        });
        if (message) message.textContent = "";
    }

    details.addEventListener("input", updateCounter);
    updateCounter();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        let valid = true;

        const fullName = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const age = Number(document.getElementById("age").value);
        const education = document.getElementById("education").value;
        const purpose = document.getElementById("purpose").value;
        const consent = document.getElementById("consent").checked;

        if (fullName.length < 2) {
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

        if (valid) {
            const nameParts = fullName.split(" ");
            const lastName = nameParts[0] || fullName;
            const firstName = nameParts.slice(1).join(" ") || "";
            
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = now.toTimeString().slice(0, 5);

            const newUser = new UserAccount(
                lastName,
                firstName,
                age,
                education,
                purpose,
                currentDate,
                currentTime
            );

            registry.addUser(newUser);
            message.textContent = "Форму успішно заповнено та додано до реєстру!";
        } else {
            message.textContent = "Перевірте заповнені поля.";
        }
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            clearErrors();
            updateCounter();
        });
    });
}
console.log("ТЕСТУВАННЯ ЗАВДАННЯ 1 (Напрями діяльності)");

// 1.1 Впорядкування за тривалістю та середня кількість читачів
const task1_1 = sortAndAverageByDuration(activityDirections);
console.log("1. Відсортовані напрями за тривалістю:", task1_1.sortedDirections);
console.log("Середня кількість читачів за тривалістю:", task1_1.averagesByDuration);

// 1.2 Напрям з мінімальною кількістю читачів за добу_2
const task1_2 = getMinReadsDay2Department(activityDirections);
console.log("2. Напрям з min переглядів за добу_2:", task1_2.directionName, "| Відділ:", task1_2.department, "| Переглядів:", task1_2.readsDay2);

// 1.3 Додавання нового напряму
const incompleteDir = { name: "Неповний напрям" };
const completeDir = { id: 102.5, name: "Новий повний напрям", department: "Тест", govRelation: "Немає", readsDay1: 10, readsDay2: 20, durationYears: 1 };

console.log("3a. Додавання неповного (в кінець):", addDirection(activityDirections, incompleteDir));
console.log("3b. Додавання повного (за ID 102.5):", addDirection(activityDirections, completeDir));

// 1.4 Обчислення тривалості послуг
console.log("4a. 1 послуга (1 рік * 0.95):", calculateCombinedDuration([activityDirections[0]]));
console.log("4b. 2 послуги ((1 + 0.5) * 0.95):", calculateCombinedDuration([activityDirections[0], activityDirections[1]]));
console.log("4c. 4 послуги (сума * 0.6):", calculateCombinedDuration(activityDirections.slice(0, 4)));


console.log("\nТЕСТУВАННЯ ЗАВДАННЯ 2 (Користувачі ООП)");

// 2.1 Фільтр за місяцем та часом
console.log("1. Користувачі за травень (05) о 10:30:", registry.getUsersByMonthAndTime("05", "10:30"));

// 2.2 Середній вік
console.log("2. Середній вік користувачів:", registry.getAverageAge(), "років");

// 2.3 Класифікація
const task2_3 = registry.classifyUsers();
console.log("3. Розподіл по класах:", task2_3.classified);
console.log("Кількість у кожному класі:", task2_3.counts);

// 2.4 Сортування
console.log("4. Відсортовані користувачі з метою:");
registry.getSortedWithPurpose().forEach(item => console.log("   -", item));