import Column from "./Column.js";
import TopScreen from "./TopScreen.js";
import RankingScreen from "./RankingScreen.js";
import AddTask from "./AddTask.js";
import DueDateScreen from "./DueDateScreen.js";

export default function App({ $target }) {
    this.state = {
        tasks: [],
        users: [
            {
                name: "kim",
                value: 0,
            },
            {
                name: "Park",
                value: 0,
            },
            {
                name: "son",
                value: 0,
            },
            {
                name: "Lee",
                value: 0,
            },
        ],
        showRanking: false,
        addTask: false,
        showDueDate: false,
    };

    this.setState = (nextState) => {
        this.state = nextState;
        column1.setState(this.state);
        column2.setState(this.state);
        column3.setState(this.state);
        column4.setState(this.state);
        rankingScreen.setState(this.state);
        addTask.setState(this.state);
        dueDateScreen.setState(this.state.showDueDate);
    }

    const topScreen = new TopScreen({
        $target: $target,
        createTaskButtonClick: () => {
            this.setState({
                ...this.state,
                addTask: true,
            })
        },
        showRankingButtonClick: () => {
            this.setState({
                ...this.state,
                showRanking: true,
            })
        }
    })
    const column1 = new Column({
        $target: $target,
        initialState: this.state,
        column_name: "백로그",
        column_id: 1,
        cheerUpButtonClick: (getId) => {
            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].cheerUp++;
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        },
        nextButtonClick: (getId) => {
            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].colId++;
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        }
    });

    this.date = null;
    this.id = null;

    const column2 = new Column({
        $target: $target,
        initialState: this.state,
        column_name: "해야할 일",
        column_id: 2,
        cheerUpButtonClick: (getId) => {
            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].cheerUp++;
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        },
        nextButtonClick: (getId) => {
            this.setState({
                ...this.state,
                showDueDate: true,
            }) //듀데이트 입력화면 출력

            this.id = getId; //id 저장

            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].colId++;
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        }
    });

    const column3 = new Column({
        $target: $target,
        initialState: this.state,
        column_name: "진행중",
        column_id: 3,
        cheerUpButtonClick: (getId) => {
            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].cheerUp++;
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        },
        nextButtonClick: (getId) => {
            const nextTasks = this.state.tasks;
            const nextUsers = this.state.users;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].colId++;

                    const currentDate = new Date();
                    console.log(nextTasks[i]);

                    if (nextTasks[i].dueDate) {
                        console.log("유저 밸류 높이기")
                        if (nextTasks[i].dueDate.getTime() > currentDate.getTime()) { //듀데이트 지키기 성공
                            for (let u = 0; u < nextUsers.length; u++) {
                                for (let l = 0; l < nextTasks[i].admins.length; l++) {
                                    if (nextUsers[u].name === nextTasks[i].admins[l]) {
                                        nextUsers[u].value++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.setState({
                ...this.state,
                tasks: nextTasks,
                users: nextUsers,
            })
        }
    });

    const column4 = new Column({
        $target: $target,
        initialState: this.state,
        column_name: "끝난 일",
        column_id: 4,
        cheerUpButtonClick: (getId) => {
            const nextTasks = this.state.tasks;

            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == getId) {
                    nextTasks[i].cheerUp++;
                }
            }

            this.setState({
                ...this.state,
                tasks: nextTasks,
            })
        },
        nextButtonClick: () => { },
    });

    const rankingScreen = new RankingScreen({
        $target: $target,
        initialState: this.state,
        onClose: () => {
            this.setState({
                ...this.state,
                showRanking: false,
            })
        }
    })

    const addTask = new AddTask({
        $target: $target,
        initialState: this.state,
        onClose: () => {
            this.setState({
                ...this.state,
                addTask: false,
            })
        },
        addNewTask: (newTask) => {
            this.setState({
                ...this.state,
                tasks: [...this.state.tasks, newTask],
            })
        }
    })

    const dueDateScreen = new DueDateScreen({
        $target: $target,
        initialState: this.state.showDueDate,
        submitDueDate: (getDate) => {
            this.date = getDate;
            const nextTasks = this.state.tasks;
            for (let i = 0; i < nextTasks.length; i++) {
                if (nextTasks[i].id == this.id) {
                    nextTasks[i].dueDate = new Date(this.date);
                }
            }
            this.date = null;
            this.id = null;
            console.log(nextTasks);
            this.setState({
                ...this.state,
                tasks: nextTasks
            })
        },
        onClose: () => {
            this.setState({
                ...this.state,
                showDueDate: false,
            })
        }
    })

}