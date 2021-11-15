// orderOfPresentation
// 문제
// 말썽꾸러기 김코딩은 오늘도 장난을 치다가 조별 발표 순서가 담긴 통을 쏟고 말았습니다.

// 선생님께서는 미리 모든 발표 순서의 경우의 수를 저장해 놓았지만 김코딩의 버릇을 고치기 위해 문제를 내겠다고 말씀하셨습니다.

// 김코딩은 모든 조별 발표 순서에 대한 경우의 수를 차례대로 구한 뒤 발표 순서를 말하면 이 발표 순서가 몇 번째 경우의 수인지를 대답해야 합니다.

// 총 조의 수 N과 선생님이 말씀하시는 발표 순서 k가 주어질 때, 김코딩이 정답을 말 할 수 있게 올바른 리턴 값을 구하세요.

// 모든 경우의 수가 담긴 배열은 번호가 작을수록 앞에 위치한다고 가정합니다.
// ex) N = 3일경우, [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 입력
// 인자 1: N
// Number 타입의 1 <= N <= 12인 조의 개수
// 인자 2: K
// Number타입의 Array (0 <= index)
// ex) n이 3이고 k가 [2, 3, 1]일 경우

// 모든 경우의 수를 2차원 배열에 담는다면 [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]이 되고,

// 반환하는 값은 3이 됩니다.

// 주의사항
// k내에 중복되는 요소는 없다고 가정합니다.

// 입출력 예시
// let output = orderOfPresentation(3, [2, 3, 1]);
// console.log(output); // 3

// output = orderOfPresentation(5, [1, 3, 2, 4, 5])
// console.log(output); // 6

// 경우의 수 문제 중 순열과 관련된 문제
// 배열을 만들고 반복문안에서 재귀를 돌리는 형식의 배열의 원소가 같은지 비교하는 방법은 경우의 수가 많아짐
// 따라서 재귀를 돌리게되면 시간 복잡도가 높아짐. 최대한 반복문이 적게 돌게 해줘야 함

// 만약 N이 4이고, 발표 순서가 [4, 2, 3, 1]이라는 예시를 들어보겠다.
// 총 경우의 수는 4! = 24가지이다.
// 하지만 [4, 1, 2, 3]가 몇 번째인지는 계산을 통하여 쉽게 알 수 있다.
// 1 + 3 X 3!번째이다.

// N-1을 구한 다음 순서를 구해야 됨
// 그리고 그것이 세 번 반복되기 때문에 3을 곱해주는 것이다.
// 그리고 그 다음의 경우의 수이기 때문에 1을 더하면 된다.
// 이 문제의 핵심은 문제를 분리시켜서 생각해보는 것이다.
// 기준점은 배열의 요소이다. 위에서는 0번째 인덱스를 기준으로 생각한 것이다.
// 그다음에는 1번째 인덱스인 2를 기준으로 생각하는 것이다.
// 앞 순서가 4이고 그다음의 순서가 2인 경우 중 맨 앞의 경우
// (즉, [4, 2, 1, 3])가 [4, 1, 2, 3]보다 몇번째 앞서있는지를 구하면 된다.
// 앞의 방식대로 구하면 1 * 2!가 될 것이다.
// 이러한 과정을 마지막 배열의 값까지 반복시킨 다음 최종 값을 구하면 된다.

function orderOfPresentation(N, K) {
  // 조의 개수 N, 발표 순서 K

  // factorial 값을 구하는 함수 || 재귀 or 반복문 이용할 함수
  const factorial = (n) => {
    if (n < 2) return 1;
    return n * factorial(n - 1);
  };

  // N개의 순서 배열 생성 new Array(N) === n개의 undefinded 배열
  // Array.keys로 index 값이 생성된 배열로 만들어 주고
  // N개의 1부터 시작하는 배열 -> map 0부터 시작을 1부터 시작으로 바꿔줌
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
  let arr = [...new Array(N).keys()].map((i) => i + 1);

  // 발표 순서를 담는 변수 result, 0으로 초기화 하고 최종적으로 출력할 변수
  let result = 0;

  // 발표 순서 K의 길이만큼 반복문을 실행
  for (let i = 0; i < K.length; i++) {
    // K의 i번째 조를 담는 변수 num
    let num = K[i];

    // candidate 1xxx 2xxx 3xxx 3개 반복을 구해주는 코드
    // n !== num인 이유는 4123인 경우 4이전의 경우의 수를 구하기 위해
    // ref코드 N-i-1으로 (n-1)! (n-2)! (n-3)! 이런식으로 진행되게 함
    // ref (n-i)!가 아닌 이유는 idx 0부터 시작으로 (n-0)!이 되면 안되기에 -1
    arr = arr.filter((n) => n !== num);

    // cadidate를 구해야 3! x candidate
    let candidate = arr.filter((n) => n < num).length;

    result += factorial(arr.length) * candidate;
  }

  return result;
}
