class MyCalendar extends HTMLElement {
    constructor() {
        super();
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const monthYear = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        const days = this.getDaysOfMonth(this.currentMonth, this.currentYear);

        const style = `:host {
  display: block;
  font-family: sans-serif;
}

.calendar {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 220px;
}

.month-year {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #6b7280;
  font-size: 16px;

}

.prev-month, .next-month {
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

.prev-month:hover, .next-month:hover {
  color: #374151;
}

.days-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6b7280;
  font-size: 12px;

}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
  color: #374151;
  grid-auto-columns: 30px;
  grid-auto-rows: 30px;
}

.day {
  height: 24px;
  line-height: 24px;
  width: 24px;
  margin: 2px;
  text-align: center;
  font-size: 12px;
  border-radius: 50%;
}

.day:hover {
  background-color: #4b5563;
  color: #f3f4f6;
  cursor: pointer;
}

.today {
  background-color: #e5e7eb;
  color: #6b7280;
}

hr {
  border: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {

  .calendar {
    background-color: #111827;
    border: 1px solid #4b5563;
    color: #f3f4f6;
  }

  .month-year {
    color: #e5e7eb;
  }

  .days-of-week {
    color: #e5e7eb;
  }

  .days {
    color: #f3f4f6;
  }

  hr {
    border: 1px solid #374151;
  }

  .prev-month, .next-month {
    color: #d1d5db;
  }

  .prev-month:hover, .next-month:hover {
    color: #f3f4f6;
  }

  .today {
    background-color: #374151;
    color: #d1d5db;
  }
}`;


        const html = `
        <div class="calendar">
          <div class="month-year">
            <div>${monthYear}</div>
            <div style="display: flex; gap: 15px;">
            <div class="prev-month">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>
            <div class="next-month">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>
            </div>
          </div>
          <div class="days-of-week">
            ${this.daysOfWeek.map(day => `<div class="day-of-week">${day}</div>`).join('')}
          </div>
          <hr>
          <div class="days">
            ${days.map(day => day.date ? `<div class="day ${day.isToday ? 'today' : ''}">${day.date}</div>` : '<div class"day"></div>').join('')}
          </div>
        </div>
      `;

        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        ${html}
      `;

        const prevMonthButton = this.shadowRoot.querySelector('.prev-month');
        const nextMonthButton = this.shadowRoot.querySelector('.next-month');

        prevMonthButton.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.render();
        });

        nextMonthButton.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.render();
        });
    }

    getDaysOfMonth(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({ date: i, isToday: this.isToday(date) });
        }

        for (let i = 0; i < firstDayOfWeek - 1; i++) {
            days.unshift({});
        }

        return days;
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }
}

customElements.define('custom-calendar', MyCalendar);
