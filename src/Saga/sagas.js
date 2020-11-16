import reduxSagaFirebase from '../Config/firebaseConfig';
import * as actions from '../Store/actions'
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getTodos() {
    const snapshot = yield call(reduxSagaFirebase.firestore.getCollection, 'todos');
    
    let todos = [];
    
    snapshot.forEach(item => {
        const { text, completed } = item.data()
        
        const todo = {
            id: item.id,
            text: text,
            completed: completed
        } 

        todos = [...todos, todo]
    });
    yield put({ type: actions.GOTTODOS , payload: todos });
  }

function* addTodo(action) {
    yield call(reduxSagaFirebase.firestore.addDocument, 'todos',
        {
            text: action.payload,
            completed: false
        }
    );
}

function* toggleTodo(action) {
    yield call(reduxSagaFirebase.firestore.updateDocument,  `todos/${action.payload.id}`, 'completed', !action.payload.completed);
}

function* editTodo(action) {
    yield call(reduxSagaFirebase.firestore.updateDocument, `todos/${action.payload.id}`, 'text', `${action.payload.text}`);
}

function* removeTodo(action) {
    yield call(reduxSagaFirebase.firestore.deleteDocument, `todos/${action.payload}`);
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GETTODOS, getTodos),
        takeLatest(actions.TODOADD, addTodo),
        takeLatest(actions.TODOREMOVED, removeTodo),
        takeLatest(actions.TODOTOGGLED, toggleTodo),
        takeLatest(actions.TODOEDIT, editTodo)
    ])
}