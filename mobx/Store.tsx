import React from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { decorate, observable } from "mobx"
import { number } from "prop-types";

export const StoreContext = React.createContext(null) ;

export const StoreProvider = ({ children }) => {

  //  @observable text: string = '';

  const store = useLocalStore(() => ({
    bugs: ["Centipede"],
    addBug: bug  => {
      store.bugs.push(bug);
    },
    get bugsCount() : number {
      return store.bugs.length;
    },

    korisnik:[],
    imekorisnika:"w",

    addKorisnik: korisnik => {
        store.korisnik.push(korisnik);
    },

    addImekorisnika: ime => {
      store.imekorisnika=ime;
  }

  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
/*
const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => <h1>{store.bugsCount} Bugs!</h1>);
};

const BugsList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.bugs.map(bug => (
        <li key={bug}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");

  return (
    <form
      onSubmit={e => {
        store.addBug(bug);
        setBug("");
        e.preventDefault();
      }}
    >
      <input
        type="text"
        value={bug}
        onChange={e => {
          setBug(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <main>
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </main>
    </StoreProvider>
  );
}





---------------------
import { observable, computed, action, decorate } from "mobx"

class Timer {
    start = Date.now()
    current = Date.now()

    get elapsedTime() {
        return this.current - this.start + "milliseconds"
    }

    tick() {
        this.current = Date.now()
    }
}
decorate(Timer, {
    start: observable,
    current: observable,
    elapsedTime: computed,
    tick: action,
})

---------------
*/