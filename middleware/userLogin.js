module.exports = (req, res, next) => {
	if (req.user) {
		//good logged in
		next()

	} else {
		///bad, not logged in
		req.flash('error', 'You must be logged in to view page')
		res.redirect('/auth/login')
	}
}