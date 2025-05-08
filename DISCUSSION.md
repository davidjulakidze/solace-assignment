# DISCUSSION

---

## Additional Improvements I Would Make with More Time

### 1. **Full-Text Search**
   - Implement PostgreSQL's full-text search for better performance and relevance ranking. Could also use ElasticSearch.

### 2. **Keyset Pagination**
   - Replace offset-based pagination with keyset pagination for improved performance on large datasets. Maybe use something like lastSeenName or lastSeenId

### 3. **Frontend Enhancements**
   - Add loading indicators for API calls.
   - Improve the UI/UX for sorting and filtering.

### 4. **Advocate Schema**
   - Add additional columns to Advocates so that it is easier to match
   - some good columns would be "Known Languages,  Availability, Gender, Reviews and Ratings, e.t.c

### 5. **Advocate Profile**
   - Add a page for applying as an advocate, create profile, e.t.c
   - Add a profile picture to advocates rows, add ability to upload a profile pictures as an advocate

---

## Issues with the Current Code and Improvements

### 1. **Error Handling**
   - **Issue**: Errors are logged to the console, and the API returns a generic error message.
   - **Improvement**: Implement structured error handling with detailed error messages and proper logging using a library like `pino`.

### 2. **API Endpoint for Total Count**
   - **Issue**: The total count is fetched alongside the data in the same API call, this is ok for now but in the future it can be inefficient for large datasets.
   - **Improvement**: Create a separate API endpoint (`GET /api/advocates/count`) to fetch the total count independently.

### 3. **Testing**
   - **Issue**: There are no unit or integration tests for the API endpoints or frontend components.
   - **Improvement**: using `jest`, add tests for:
     - API endpoints 
     - Frontend components 