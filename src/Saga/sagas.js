import reduxSagaFirebase, { database } from "../Config/firebaseConfig";
import * as actions from "../Store/actions";
import { all, call, put, takeEvery, takeLatest, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

function* getTodos() {
  const updateChannel = todosEventChannel();
  while (true) {
      const { todos } = yield take(updateChannel)

      yield put({ type: actions.GOTTODOS , payload: todos })
  }
}

function todosEventChannel() {
  const channel = new eventChannel((emitter) => {
    const listener = database
      .collection("todos")
      .onSnapshot((querySnapshot) => {
        let todos = [];

        querySnapshot.forEach((document) => {
          const { text, completed } = document.data();

          const todo = {
            id: document.id,
            text: text,
            completed: completed,
          };

          todos.push(todo);
        });
        emitter({ todos: todos });
      });
    return () => {
      listener.off();
    };
  });
  return channel;
}

function* addTodo(action) {
  yield call(reduxSagaFirebase.firestore.addDocument, "todos", {
    text: action.payload,
    completed: false,
  });
}

function* toggleTodo(action) {
  yield call(
    reduxSagaFirebase.firestore.updateDocument,
    `todos/${action.payload.id}`,
    "completed",
    !action.payload.completed
  );
}

function* editTodo(action) {
  yield call(
    reduxSagaFirebase.firestore.updateDocument,
    `todos/${action.payload.id}`,
    "text",
    `${action.payload.text}`
  );
}

function* removeTodo(action) {
  yield call(
    reduxSagaFirebase.firestore.deleteDocument,
    `todos/${action.payload}`
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GETTODOS, getTodos),
    takeLatest(actions.TODOADD, addTodo),
    takeLatest(actions.TODOREMOVED, removeTodo),
    takeLatest(actions.TODOTOGGLED, toggleTodo),
    takeLatest(actions.TODOEDIT, editTodo),
  ]);
}
