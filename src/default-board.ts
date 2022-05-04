import UniqueID from "./utils/UniqueID";

export default {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "Task description",
          name: "first task",
          id: UniqueID().getID(),
          userAssigned: null,
        },
        {
          description: "Second task description",
          name: "second task",
          id: UniqueID().getID(),
          userAssigned: null,
        },
        {
          description: "",
          name: "and third",
          id: UniqueID().getID(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: UniqueID().getID(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: UniqueID().getID(),
          userAssigned: null,
        },
      ],
    },
  ],
};
