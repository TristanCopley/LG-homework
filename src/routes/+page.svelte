<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let singleValue = data.singleValueArray[0];
	let settings = data.settings;

	let singleValueInput = 0.01;

	async function updateSingleValue() {
		let val = singleValue;
		val.value = singleValueInput;

		const response = await fetch('/api/updateSingleValue', {
			method: 'POST',
			body: JSON.stringify(val),
			headers: {
				'content-type': 'application/json'
			}
		});

		singleValue = await response.json();
	}

	async function getSingleValue() {
		const response = await fetch('/api/updateSingleValue', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		singleValue = await response.json();
	}

	const updateSetting = (id: number, value: string) => async () => {
		const response = await fetch('/api/updateSetting', {
			method: 'POST',
			body: JSON.stringify({ id, value }),
			headers: {
				'content-type': 'application/json'
			}
		});
		settings[id - 1] = await response.json();
	};
</script>

<div class="bg-base-300 w-screen min-h-screen p-8 flex flex-col justify-center gap-8">
	<div class="flex gap-8 justify-center self-center">
		<div class="bg-base-200 w-96 h-64 self-center justify-center flex">
			<span class="self-center text-3xl w-fit h-fit text-center px-8 btn btn-neutral"
				>{singleValue.value}</span
			>
		</div>
		<div class="bg-base-200 w-96 h-64 self-center flex flex-col justify-center">
			<div class="flex flex-col justify-center self-center gap-8">
				<div class="form-control self-center">
					<label class="label">
						<span class="label-text">Enter number:</span>
					</label>
					<label class="input-group">
						<input
							type="text"
							placeholder="ex: 0.01"
							class="input input-bordered"
							bind:value={singleValueInput}
						/>
						<button class="btn btn-neutral" on:click={updateSingleValue}> Write </button>
					</label>
				</div>
				<button class="btn btn-neutral" on:click={getSingleValue}> Read </button>
			</div>
		</div>
	</div>
	<div class="flex gap-8 justify-center self-center">
		<div class="max-w-3xl h-fit self-center">
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th />
							<th>Option</th>
							<th>Value</th>
							<th>Update</th>
						</tr>
					</thead>
					{#each settings as row, i}
						<tbody>
							<tr>
								<th>{i}</th>
								<td>{row.title}</td>
								<td>
									<input
										type="text"
										placeholder="ex: 0.01"
										class="input input-bordered"
										bind:value={row.value}
									/>
								</td>
								<td>
									<button class="btn btn-neutral" on:click={updateSetting(i + 1, row.value)}>
										Update
									</button>
								</td>
							</tr>
						</tbody>
					{/each}
				</table>
			</div>
		</div>
	</div>
</div>

<!-- 
<div class="grid">
	<div>
		<h2>Articles:</h2>
		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>
					{article.content}
				</p>
				<form action="?/deleteArticle&id={article.id}" method="POST">
					<button type="submit" class="outline secondary">Delete Article</button>
				</form>
				<a href="/{article.id}" role="button" class="outline constrast" style="width: 100%;"
					>Edit Article</a
				>
			</article>
		{/each}
	</div>
	<form action="?/createArticle" method="POST">
		<h3>New Article</h3>
		<label for="title"> Title </label>
		<input type="text" id="title" name="title" />
		<label for="title"> Title </label>
		<textarea id="content" name="content" rows={5} />
		<button type="submit">Add Article</button>
	</form>
</div> -->
