import { Person } from "./Person";
import config from "./config.json";
import { PersonFilter } from "./PersonFilter";

export class People {
  private static instance: People | null = null;
  private people: Person[] = [];

  private constructor() {
    // Инициализация если нужно будет
  }

  public static getInstance(): People {
    if (!People.instance) {
      People.instance = new People();
    }
    return People.instance;
  }

  public addPerson(person: Person): void {
    this.people.push(person);
  }

  public getAllPeople(): Readonly<Person[]> {
    return [...this.people];
  }

  public static async getPersonByUID(UID: number): Promise<Person | undefined> {
    try {
      const response = await fetch(`${config.url}/user/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_ids: [UID],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        await People.handleApiError(response);
        return;
      }

      if (data?.users && data.users[UID.toString()]) {
        const userData = data.users[UID.toString()];

        return new Person(
          UID,
          userData.first_name,
          userData.last_name,
          userData.nickname,
          userData.email
        );
      }
      return undefined;
    } catch (error) {
      console.error("Ошибка сети:", error);
      return undefined;
    }
  }

  // TODO friend list
  // People.getPeopleByFilter(new PersonFilter(undefiend, undefiend, undefiend, undefiend, FRIEND))
  public static async getPeopleByFilter(
    filter: PersonFilter
  ): Promise<Person[] | []> {
    const name = filter.getName();
    const surname = filter.getSurname();
    const email = filter.getEmail();
    const nickname = filter.getNickname();
    const relation = filter.getRelation();

    let currentFilterType = "all";
    let currentFilterString = "";

    if (name != undefined) {
      currentFilterType = "first_name";
      currentFilterString = name;
    } else if (surname != undefined) {
      currentFilterType = "last_name";
      currentFilterString = surname;
    } else if (email != undefined) {
      currentFilterType = "email";
      currentFilterString = email;
    } else if (nickname != undefined) {
      currentFilterType = "nickname";
      currentFilterString = nickname;
    }

    try {
      const response = await fetch(`${config.url}/user/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_string: currentFilterString,
          request_filter: currentFilterType,
          relationship_filter: relation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        await People.handleApiError(response);
        return [];
      }

      const peoples: Person[] = [];

      for (let i = 0; i < data.length; i++) {
        const userId = Object.keys(data.users)[i];
        const userData = data.users[userId];
        peoples.push(
          new Person(
            Number(userId),
            userData.first_name,
            userData.last_name,
            userData.nickname,
            userData.email
          )
        );
      }

      return peoples;
    } catch (error) {
      console.error("Ошибка сети:", error);
      return [];
    }

    return [];
  }

  // Вспомогательные методы

  private static async handleApiError(response: Response): Promise<void> {
    try {
      const data = await response.json();

      if (data?.errors) {
        const errorCode = Object.keys(data.errors)[0];
        const errorMessages = data.errors[errorCode];
        const firstError = errorMessages[0];

        console.error("Ошибка API:", firstError.message_ru);
      } else {
        console.error("Неизвестная ошибка API");
      }
    } catch (error) {
      console.error("Ошибка при обработке ошибки API:", error);
    }
  }

  // TODO отправить заявку в друзья и принять/отклонить

  // TODO установить/разорвать связь

  // TODO добавить/удалить друга
}
