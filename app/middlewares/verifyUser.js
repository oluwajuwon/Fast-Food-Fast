
class VerifyUser {
  checkIfadmin(request, response, next) {
    if (request.decoded.user.userType !== 'Admin') {
      return response.status(403).json({
        success: 'false',
        message: 'Forbidden from this route, please contact the administrator',
      });
    }
    return next();
  }
}

const verifyUSer = new VerifyUser();
export default verifyUSer;
