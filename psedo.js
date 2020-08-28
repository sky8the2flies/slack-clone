/* MEMBERS
Model:
_id: created auto
- Name: String
- Email: String
- Avatar: String
- googleid: String

Controller:
- view
- create
- update
- delete

Routes:
- GET /members/:id
- POST /members
- DELETE /members/:id
- PUT /members/:id
*/
/* CHANNELS
Model:
- _id: created auto
- Name: String, possibly unique
- Description: String
- Members: _id ref Member

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
- Member: _id ref Member
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
 - message: _id ref Message
 - Member: _id red Member

 Controller:
 - create
 - delete

 Routes:
 - DELETE /channels/:cid/messages/:mid/replies:rid
 - POST /channels/:cid/messages/:mid/replies
  */