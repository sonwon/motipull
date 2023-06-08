
export default function TaskScreen({ $target, initialState, column_id, cheerUpButtonClick, nextButtonClick }) {

    const $taskScreen = document.createElement('div');

    this.state = initialState;

    $target.appendChild($taskScreen);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        const { tasks } = this.state;
        const currentDate = new Date();

        $taskScreen.innerHTML = `
            <ul>
                ${tasks.map(({ colId, id, name, description, admins, classifications, isDetailWorks, detailWorks, cheerUp, dueDate }) => `
                ${(colId == column_id) ?
                `<li data-id="${id}" class="taskItem">
                        <h3 class="taskTitle">${name}</h3>
                        <p class="taskContent">${description}</p>
                        <ul class="adminWrapper">
                            ${admins.map((admin) => `
                                        <li class="admin">${admin}</li>
                                    `).join('')}
                        </ul>
                        <ul class="classificationWrapper">
                            ${classifications.map((classification) => `
                                        <li class="classification">${classification}</li>
                                    `).join('')}
                        </ul>
                        ${isDetailWorks ? `
                                    <div class="detailWorksPercent">세부 Works 
                                    <b>${Math.floor(((detailWorks.filter(({ isComplete }) => { return isComplete }).length) / detailWorks.length) * 100)}%</b>
                                    진행</div>
                                    <div class="detailWorksSentence">시작이 반! 하나부터 시작해보아요!</div>
                                ` : ``}
                        <button class="cheerUp">응원</button>
                        <div class="detailWorksSentence">${cheerUp}명이 응원합니다!</div>
                        <div class="dueDate">${dueDate ? `
                            ${((dueDate.getTime() - currentDate.getTime()) / 60 / 60 / 24 / 1000) >= 0 ?
                        `<b>${Math.ceil((dueDate.getTime() - currentDate.getTime()) / 60 / 60 / 24 / 1000)}</b>일 남았습니다` : 'dueDate를 넘겼습니다.'}
                        ` : ``}</div>
                        ${(colId != 4 ? `<button class="next">다음 단계로</button>` : ``)}
                    </li>`
                : ''}
                `).join('')}
            </ul>
        `;
    }
    $taskScreen.addEventListener('click', (e) => {
        const $li = e.target.closest('li')
        if (e.target.className === "cheerUp") {
            const getId = $li.dataset.id;
            cheerUpButtonClick(getId);
        }

        if (e.target.className === "next") {
            const getId = $li.dataset.id;
            nextButtonClick(getId)
        }
    })


    this.render();
}