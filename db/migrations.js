// add created_at
db.collections.users.update({}, {$set: { created_at:  Math.round(new Date().getTime() / 1000) }}, {multi: true})
