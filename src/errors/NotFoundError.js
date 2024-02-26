// Creates a child class 'NotFoundError' of parent class 'Error'
class 'NotFoundError' extends Error {
  consructor(resourseType, id) {
    super('$(resourseType} with id ${id} not found ');
    this.name= "NotFoundError";
