export const palindromesController = async (req, res) => {
  const start = +req.body.start;
  const end = +req.body.end;

  const palindromes = await palindromesService(start, end);
  return res.status(200).json(palindromes);
};

export const palindromesService = (start, end) => {
  const palindromes: number[] = [];

  for (let i = start; i <= end; i++) {
    const split = i.toString().split("");
    const newNumber = +[...split].reverse().join("");
    newNumber == i && palindromes.push(i);
  }

  return palindromes
};
