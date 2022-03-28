
Vue.component('todo-list', {
    props:['todos'],
    template:`
    <div>
        <div class="forTodos">
            <div class="todo-form-up">
                <div class="todo-form" v-for="(todo, e) in todos">
                    <div class="todo-title"> {{ todo.todosID }}. {{ todo.todoTitle }}</div>
                    <div class="for-add-todo" v-for="(task, x) in newTodoCase" :key="task.caseID">
                        <div> {{ task.caseID }}. {{ task.caseTitle }} </div>
                        <button class="done-todo-button"> Выполенно</button>
                        <button class="add-todos" @click="deleteCase(x)"> x</button>
                    </div>
                    <div class="forCase">
                        <form class="for-add-todo-case" @submit.prevent="addTodo">
                            <input placeholder="Добавить задачу" v-model="newCaseTitle">
                            <button> +</button>
                        </form>
                    </div>
                    <button class="delete-todo-button" @click="deleteTodo(e)"> X</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            newTodosID: 1,
            newTodoTitle: '',
            newTodo: [],
            newTodoId: 1,
            newTodoCase: [],
            newCaseID: 1,
            newCaseTitle: '',
            styleobj: {
                backgroundColor: "white"
            },
            clicked: false,
            errors: []
        }
    } ,


    methods: {
        addTodos: function () {
            this.todos.push({
                todoTitle: this.newTodoTitle,
                todosID: this.newTodosID++,
                todo: this.newTodo,
            })
            this.addTod()
            this.newTodoTitle = ''
        },

        addTod: function () {
            this.newTodo.push({
                todoId: this.newTodoId++,
                todoCase: this.newTodoCase,
            })
        },

        addTodo: function () {
            this.newTodoCase.push({
                caseID: this.newCaseID++,
                caseTitle: this.newCaseTitle,
            })
            this.newCaseTitle = ''
        },
        //
        // addTodoCase: function() {
        //     this.newTodoCase.push({
        //         caseID: this.newCaseID++,
        //         caseTitle: this.newCaseTitle
        //     })
        //     this.newCaseTitle = ''
        // },

        doneCase(x) {
            this.newTodoCase.style = "greenyellow"
        },

        deleteCase(x) {
            this.newTodoCase.splice(x, 1)
        },

        deleteTodo(e) {
            this.todos.splice(e, 1)
        },

        originalcolor: function () {
            this.styleobj.backgroundColor = "#72eada";
        },

        changeOriginalColor: function () {
            this.styleobj.backgroundColor = "white"
        },
    }
})
let mv = new Vue({
    el: '#app',
    data: {
        allTodos: [],
        todos:[]
    },

    mounted() {
        if (localStorage.getItem('allTodos')) {
            try {
                this.allTodos = JSON.parse(localStorage.getItem('allTodos'));
            } catch (e) {
                localStorage.removeItem('allTodos');
            }
        }
    },

    methods: {
        saveTodos() {
            const parsedTodos = JSON.stringify(this.allTodos);
            localStorage.setItem('allTodos', parsedTodos);
        },

        addInAllTodos(){
            this.allTodos.push({
                todos: this.todos
            })
            this.saveTodos()
        },

        deleteTodos(e) {
            this.allTodos.splice(e, 1)
        },
    }
})