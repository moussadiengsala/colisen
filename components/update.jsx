// "use client"
// import { useState, useEffect } from 'react'
// import { createClient } from '@/utils/supabase/client'
// import AvatarU from './updateProfile'

// export default function Account({ user }) {
//   const [loading, setLoading] = useState(true)
//   const [avatar_url, setAvatarUrl] = useState(null)

//   useEffect(() => {
//     const supabase = createClient();
//     let ignore = false
//     async function getProfile() {
//       setLoading(true)

//       const { data, error } = await supabase
//         .from('profiles')
//         .select(`avatar_url`)
//         .eq('id', user.id)
//         .single()

//       if (!ignore) {
//         if (error) {
//           console.warn(error)
//         } else if (data) {
//           setAvatarUrl(data.avatar_url)
//         }
//       }

//       setLoading(false)
//     }

//     getProfile()

//     return () => {
//       ignore = true
//     }
//   }, [user])

//   async function updateProfile(event, avatarUrl) {
//     const supabase = createClient();
//     event.preventDefault()

//     setLoading(true)

//     const updates = {
//       id: user.id,
//       avatar_url: avatarUrl,
//       updated_at: new Date(),
//     }

//     const { error } = await supabase.from('profiles').upsert(updates)

//     if (error) {
//       alert(error.message)
//     } else {
//       setAvatarUrl(avatarUrl)
//     }
//     setLoading(false)
//   }

//   return (
//     <form onSubmit={updateProfile} className="form-widget">
//       <AvatarU
//         url={avatar_url}
//         size={150}
//         onUpload={(event, url) => {
//           updateProfile(event, url)
//         }}
//       />

//       <div>
//         <button className="button block primary" type="submit" disabled={loading}>
//           {loading ? 'Loading ...' : 'Update'}
//         </button>
//       </div>
//     </form>
//   )
// }