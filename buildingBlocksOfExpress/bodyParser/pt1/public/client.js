$(function() {
	$.get('/blocks', appendToList);

	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		// Transforms form data into URL-encoded notation
		var blockData = form.serialize();

		$.ajax({
			type: 'POST',
			url: '/blocks/',
			data: blockData
		}).done(function(blockName){
			appendToList([blockName]);
			form.trigger('reset');
		});
	});

	function appendToList(blocks) {
		var list = [];
		var content, block;
		for(var i in blocks) {
			block = blocks[i];
			content = '<a href="/blocks/' + block + '">' + block + '</a>';
			list.push($('<li>', { html: content }));
		}

		$('.block-list').append(list);
	}
});
