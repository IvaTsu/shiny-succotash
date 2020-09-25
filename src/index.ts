require('dotenv').config()

import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants";
import { Post } from "./entities";
import mikroORMConfig from "./mikro-orm.config";

const initDB = async () => {
  try {
    const orm = await MikroORM.init(mikroORMConfig);
    // Run migrations
    await orm.getMigrator().up();
    // Create Post
    const post = orm.em.create(Post, { title: "My First Post" });
    await orm.em.persistAndFlush(post)
    // Read Post
    const posts = await orm.em.find(Post, {});
    console.log({ posts });
  } catch (error) {
    console.log({ error })
  }
}

(function main() {
  console.log("Hello World")
  initDB()
})()