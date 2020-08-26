/* USERS
Model:
_id: created auto
- Username: String
- Email: String
- Avatar: String
- googleid: String

Controller:
- view
- create
- update
- delete

Routes:
- GET /users/:id
- POST /users
- DELETE /users/:id
- PUT /users/:id
*/
/* CHANNELS
Model:
- _id: created auto
- Name: String, possibly unique
- Description: String
- Members: _id ref User

Controller:
- view
- create
- delete

Routes:
- GET /channels/:cid
- DELETE /channels/:cid
- GET /channels
- POST /channels
*/

/* MESSAGES
Model:
- _id: created auto
- Content: String
- Reactions: String? Will be emojies [ICE BOX]
- Replies: [messageSchema]
- Member: _id ref User
- Channel: _id ref Channel

Controller:
- create
- delete
- view

Routes:
- GET /channels/:cid/messages/:mid
- DELETE /channels/:cid/messages/:mid
- POST /channels/:cid/messages
 */

 /* REPLIES
 Model - Schema inside messages:
 - _id: created auto
 - Content: String
 - Reactions: String? Will be emojies [ICE BOX]
 - Member: _id red User

 Controller:
 - create
 - delete

 Routes:
 - DELETE /channels/:cid/messages/:mid/replies:rid
 - POST /channels/:cid/messages/:mid/replies
  */