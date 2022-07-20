import Swal from 'sweetalert2'

const handleUnsignedUser = (actionOfUnsignedUser) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `Sign In or Register to ${actionOfUnsignedUser}`,
  })
}
export default handleUnsignedUser