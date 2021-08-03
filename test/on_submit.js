const test = require("tape");
const path = require("path");

const { on_sign } = require("../lib/utlis/index");
const create_hash = require("../lib/hash");

const actions_obj = {
  name: "some name",
  university: "random university",
  month: "May",
  year: "1300",
  gender: "they",
  certificate_reciever: "random user",
};

let body = {
  actions: [{ value: JSON.stringify(actions_obj) }],
  state: {
    values: {
      name: { name: { value: "some name" } },
      university: { university: { value: "random university" } },
      month: { month: { value: "May" } },
      year: { year: { value: "1300" } },
      gender: { pronoun: { selected_option: { value: "they" } } },
      certificate_reciever: {
        user_select: { selected_users: ["random_user_id"] },
      },
    },
  },
  user: {
    id: "random_user_id",
  },
  container: {
    channel_id: "random_channel_id",
    thread_ts: "random_thread_identifier",
  },
};

let client = {
  files: {
    upload: () => ({ ok: true, permalink: "https://some_random_link" }),
  },
  chat: {
    postMessage: () => {},
  },
};

const ack = async () => undefined;

test("test for on_submit event", (t) => {
  t.plan(1);

  (async () => {
    const { error, result } = await on_sign({ body, client, ack });
    const file_path = path.resolve(__dirname, "../output.pdf");

    const { hash } = create_hash(file_path);

    t.equal(result, hash);
  })();
});
